import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icono from '../../componentes/comunes/Icono';
import { Cargando, ErrorRed } from '../../componentes/comunes/EstadosPantalla';
import ModalConfirmacion from '../../componentes/comunes/ModalConfirmacion';
import MapaAsientos from '../../componentes/datos/MapaAsientos';
import { useAvisos } from '../../contexto/AvisosContexto';
import useConsulta from '../../hooks/useConsulta';
import useTituloPagina from '../../hooks/useTituloPagina';
import boletoServicio from '../../servicios/boletoServicio';
import reservacionServicio from '../../servicios/reservacionServicio';
import viajeServicio from '../../servicios/viajeServicio';
import { interpretarError } from '../../utilidades/errores';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

// la misma pantalla sirve para dos casos:
//  modo "cliente": puede elegir varios asientos y crea una reservacion
//  modo "taquilla": elige un solo asiento y vende el boleto en ventanilla
export default function PaginaSeleccionAsientos({ modo }) {
  useTituloPagina(modo === 'taquilla' ? 'Vender boleto' : 'Selección de asientos');
  const { id } = useParams();
  const navegar = useNavigate();
  const avisos = useAvisos();
  const esTaquilla = modo === 'taquilla';

  const consulta = useConsulta(
    async () => {
      const [viaje, ocupados] = await Promise.all([viajeServicio.obtener(id), viajeServicio.asientosOcupados(id)]);
      return { viaje, ocupados };
    },
    [id]
  );

  const [seleccionados, setSeleccionados] = useState([]);
  const [confirmando, setConfirmando] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [boletoEmitido, setBoletoEmitido] = useState(null);

  const rutaLista = esTaquilla ? '/taquilla/vender' : '/cliente';

  const alternarAsiento = (numero) => {
    setSeleccionados((actuales) => {
      if (actuales.includes(numero)) return actuales.filter((asiento) => asiento !== numero);
      return esTaquilla ? [numero] : [...actuales, numero].sort((a, b) => a - b);
    });
  };

  const confirmar = async () => {
    setProcesando(true);
    try {
      if (esTaquilla) {
        const boleto = await boletoServicio.vender(Number(id), seleccionados[0]);
        setBoletoEmitido(boleto);
        setSeleccionados([]);
        consulta.recargar();
      } else {
        const reservacion = await reservacionServicio.crear(Number(id), seleccionados);
        navegar('/cliente/confirmacion', { state: { reservacion }, replace: true });
        return;
      }
    } catch (error) {
      avisos.error(interpretarError(error).mensaje);
      // el asiento pudo ganarse mientras se elegia: se actualiza el mapa
      setSeleccionados([]);
      consulta.recargar();
    } finally {
      setProcesando(false);
      setConfirmando(false);
    }
  };

  if (consulta.error) return <ErrorRed error={consulta.error} alReintentar={consulta.recargar} />;
  if (!consulta.datos) return <Cargando filas={6} />;

  const { viaje, ocupados } = consulta.datos;
  const total = Number(viaje.precio) * seleccionados.length;
  const salio = viaje.estado !== 'PROGRAMADO';

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <Link to={rutaLista} className="enlace">
            ← Volver a las salidas
          </Link>
          <h2>
            {viaje.origen} → {viaje.destino}
          </h2>
          <p className="pagina__subtitulo">
            <Icono nombre="reloj" tamano={16} /> {formatearFechaHora(viaje.fechaSalida)} · Autobús {viaje.autobusPlaca}
          </p>
        </div>
      </header>

      {boletoEmitido && (
        <div className="tarjeta tarjeta--exito" role="status">
          <h3 className="tarjeta__titulo">Boleto emitido</h3>
          <p>
            Código <strong>{boletoEmitido.codigo}</strong> · Asiento {boletoEmitido.numeroAsiento} ·{' '}
            {formatearMoneda(boletoEmitido.precio)}
          </p>
          <div className="acciones-fila">
            <Link to="/taquilla/boletos" className="boton boton--primario">
              Ver boletos
            </Link>
            <button type="button" className="boton boton--fantasma" onClick={() => setBoletoEmitido(null)}>
              Vender otro boleto de este viaje
            </button>
          </div>
        </div>
      )}

      <div className="asientos-pagina">
        <div className="tarjeta">
          <h3 className="tarjeta__titulo">{esTaquilla ? 'Elige el asiento' : 'Elige tus asientos'}</h3>
          {salio ? (
            <p className="formulario__aviso">Este viaje ya no está disponible para venta.</p>
          ) : (
            <MapaAsientos
              capacidad={viaje.capacidad}
              ocupados={ocupados}
              seleccionados={seleccionados}
              alAlternar={alternarAsiento}
            />
          )}
        </div>

        <aside className="tarjeta resumen">
          <h3 className="tarjeta__titulo">Resumen</h3>
          <dl className="resumen__lista">
            <div>
              <dt>Ruta</dt>
              <dd>
                {viaje.origen} → {viaje.destino}
              </dd>
            </div>
            <div>
              <dt>Salida</dt>
              <dd>{formatearFechaHora(viaje.fechaSalida)}</dd>
            </div>
            <div>
              <dt>Asientos</dt>
              <dd>{seleccionados.length ? seleccionados.join(', ') : 'Ninguno'}</dd>
            </div>
            <div>
              <dt>Precio por asiento</dt>
              <dd>{formatearMoneda(viaje.precio)}</dd>
            </div>
          </dl>

          <p className="resumen__total">
            <span>Total</span>
            <strong>{formatearMoneda(total)}</strong>
          </p>

          {!esTaquilla && (
            <p className="texto-suave">Recibirás tu confirmación por correo, SMS y WhatsApp.</p>
          )}

          <button
            type="button"
            className="boton boton--acento boton--ancho"
            disabled={seleccionados.length === 0 || salio}
            onClick={() => setConfirmando(true)}
          >
            {esTaquilla ? 'Emitir boleto' : 'Confirmar reservación'}
          </button>
        </aside>
      </div>

      <ModalConfirmacion
        abierto={confirmando}
        titulo={esTaquilla ? 'Emitir boleto' : 'Confirmar reservación'}
        mensaje={`¿Confirmas ${esTaquilla ? 'la venta del' : 'la reservación del'} asiento ${seleccionados.join(', ')} por ${formatearMoneda(total)}?`}
        detalle={esTaquilla ? undefined : 'Se enviará la confirmación a tu correo, SMS y WhatsApp.'}
        textoConfirmar="Confirmar"
        cargando={procesando}
        alConfirmar={confirmar}
        alCancelar={() => setConfirmando(false)}
      />
    </section>
  );
}
