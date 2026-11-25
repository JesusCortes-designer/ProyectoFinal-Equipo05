import { Link } from 'react-router-dom';
import useListado from '../../hooks/useListado';
import viajeServicio from '../../servicios/viajeServicio';
import { OPCIONES_TAMANO_PAGINA } from '../../utilidades/constantes';
import { formatearFechaHora, formatearMoneda } from '../../utilidades/formato';
import Icono from '../comunes/Icono';
import { Cargando, ErrorRed, SinResultados } from '../comunes/EstadosPantalla';
import BarraFiltros from './BarraFiltros';
import Paginacion from './Paginacion';

const FILTROS = [
  { nombre: 'origen', tipo: 'busqueda', marcador: 'Origen (ej. Ciudad de México)' },
  { nombre: 'destino', tipo: 'busqueda', marcador: 'Destino (ej. Puebla)' },
];

const NOMBRES_FILTROS = FILTROS.map((filtro) => filtro.nombre);
const PARAMETROS_FIJOS = { estado: 'PROGRAMADO' };

// salidas disponibles en tarjetas, con filtros y paginacion hechos en el servidor
// rutaDestino(viaje) regresa a donde lleva el boton de cada tarjeta
export default function ListaViajes({ rutaDestino, textoBoton }) {
  const listado = useListado(viajeServicio.listar, NOMBRES_FILTROS, PARAMETROS_FIJOS, 6);
  const { datos, cargando, error, pagina, tamano, cambiarPagina, cambiarTamano, recargar } = listado;

  return (
    <div>
      <div className="tarjeta">
        <BarraFiltros filtros={FILTROS} listado={listado} />
      </div>

      {error && <ErrorRed error={error} alReintentar={recargar} />}
      {cargando && !datos && !error && <Cargando filas={3} />}

      {datos && datos.contenido.length === 0 && pagina === 1 && (
        <SinResultados titulo="No hay salidas disponibles" detalle="Prueba con otro origen o destino" />
      )}

      {datos && datos.contenido.length > 0 && (
        <div className={cargando ? 'listado listado--actualizando' : 'listado'}>
          <ul className="lista-viajes">
            {datos.contenido.map((viaje) => (
              <li key={viaje.id} className="viaje">
                <div className="viaje__ruta">
                  <h3>
                    {viaje.origen} → {viaje.destino}
                  </h3>
                  <p>
                    <Icono nombre="reloj" tamano={16} /> Sale: {formatearFechaHora(viaje.fechaSalida)}
                  </p>
                </div>

                <dl className="viaje__datos">
                  <div>
                    <dt>Llegada</dt>
                    <dd>{formatearFechaHora(viaje.fechaLlegada)}</dd>
                  </div>
                  <div>
                    <dt>Autobús</dt>
                    <dd>{viaje.autobusPlaca}</dd>
                  </div>
                  <div>
                    <dt>Chofer</dt>
                    <dd>{viaje.choferNombre}</dd>
                  </div>
                  <div>
                    <dt>Precio</dt>
                    <dd>{formatearMoneda(viaje.precio)}</dd>
                  </div>
                </dl>

                <Link to={rutaDestino(viaje)} className="boton boton--acento">
                  {textoBoton}
                </Link>
              </li>
            ))}
          </ul>

          <div className="listado__pie">
            <label className="listado__tamano">
              <span>Mostrar</span>
              <select value={tamano} onChange={(evento) => cambiarTamano(Number(evento.target.value))}>
                {OPCIONES_TAMANO_PAGINA.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
              <span>salidas · {datos.totalElementos} en total</span>
            </label>
            <Paginacion paginaActual={pagina} totalPaginas={datos.totalPaginas} alCambiarPagina={cambiarPagina} />
          </div>
        </div>
      )}
    </div>
  );
}
