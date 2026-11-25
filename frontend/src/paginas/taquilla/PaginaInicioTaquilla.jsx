import { Link } from 'react-router-dom';
import Icono from '../../componentes/comunes/Icono';
import Insignia from '../../componentes/comunes/Insignia';
import { Cargando, ErrorRed } from '../../componentes/comunes/EstadosPantalla';
import TablaDatos from '../../componentes/datos/TablaDatos';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useConsulta from '../../hooks/useConsulta';
import useTituloPagina from '../../hooks/useTituloPagina';
import boletoServicio from '../../servicios/boletoServicio';
import viajeServicio from '../../servicios/viajeServicio';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';

async function cargarPanel() {
  const [viajes, boletos, activos, proximos] = await Promise.all([
    viajeServicio.listar({ pagina: 1, tamano: 1, estado: 'PROGRAMADO' }),
    boletoServicio.listar({ pagina: 1, tamano: 1 }),
    boletoServicio.listar({ pagina: 1, tamano: 1, estado: 'ACTIVO' }),
    viajeServicio.listar({ pagina: 1, tamano: 5, estado: 'PROGRAMADO' }),
  ]);

  return {
    tarjetas: [
      { etiqueta: 'Viajes programados', valor: viajes.totalElementos, icono: 'calendario' },
      { etiqueta: 'Boletos emitidos', valor: boletos.totalElementos, icono: 'boleto' },
      { etiqueta: 'Boletos activos', valor: activos.totalElementos, icono: 'check' },
    ],
    proximos: proximos.contenido,
  };
}

const COLUMNAS = [
  { titulo: 'Salida', render: (fila) => formatearFechaHora(fila.fechaSalida) },
  { titulo: 'Ruta', render: (fila) => `${fila.origen} → ${fila.destino}` },
  { titulo: 'Autobús', clave: 'autobusPlaca' },
  { titulo: 'Capacidad', render: (fila) => `${fila.capacidad} asientos` },
  { titulo: 'Precio', render: (fila) => formatearMoneda(fila.precio) },
  { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
  {
    titulo: 'Acciones',
    render: (fila) => (
      <Link to={`/taquilla/vender/${fila.id}`} className="boton-tabla boton-tabla--editar">
        Vender
      </Link>
    ),
  },
];

export default function PaginaInicioTaquilla() {
  useTituloPagina('Inicio');
  const { usuario } = useAutenticacion();
  const panel = useConsulta(cargarPanel);

  return (
    <section className="pagina">
      <header className="pagina__encabezado">
        <div>
          <p className="pagina__saludo">Bienvenido, {usuario.nombre}</p>
          <h2>Panel de taquilla</h2>
        </div>
      </header>

      {panel.error && <ErrorRed error={panel.error} alReintentar={panel.recargar} />}
      {panel.cargando && !panel.datos && !panel.error && <Cargando filas={4} />}

      {panel.datos && (
        <>
          <div className="tarjetas-resumen">
            {panel.datos.tarjetas.map((tarjeta) => (
              <div key={tarjeta.etiqueta} className="tarjeta tarjeta-resumen">
                <span className="tarjeta-resumen__icono">
                  <Icono nombre={tarjeta.icono} tamano={22} />
                </span>
                <span>
                  <span className="tarjeta-resumen__etiqueta">{tarjeta.etiqueta}</span>
                  <span className="tarjeta-resumen__valor">{tarjeta.valor}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="tarjeta">
            <h3 className="tarjeta__titulo">Próximas salidas</h3>
            {panel.datos.proximos.length === 0 ? (
              <p className="texto-suave">No hay salidas programadas.</p>
            ) : (
              <TablaDatos columnas={COLUMNAS} filas={panel.datos.proximos} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
