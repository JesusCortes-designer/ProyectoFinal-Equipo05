import { OPCIONES_TAMANO_PAGINA } from '../../utilidades/constantes';
import { Cargando, ErrorRed, SinResultados } from '../comunes/EstadosPantalla';
import Paginacion from './Paginacion';
import TablaDatos from './TablaDatos';

// muestra el resultado de useListado: cargando, error, vacio o la tabla con su paginacion
export default function ListadoPaginado({ listado, columnas, mensajeVacio, detalleVacio }) {
  const { datos, cargando, error, pagina, tamano, cambiarPagina, cambiarTamano, recargar } = listado;

  if (error) {
    return <ErrorRed error={error} alReintentar={recargar} />;
  }

  if (cargando && !datos) {
    return <Cargando />;
  }

  if (datos && datos.contenido.length === 0 && pagina === 1) {
    return <SinResultados titulo={mensajeVacio} detalle={detalleVacio} />;
  }

  return (
    <div className={cargando ? 'listado listado--actualizando' : 'listado'}>
      {datos && <TablaDatos columnas={columnas} filas={datos.contenido} />}

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
          <span>registros · {datos ? datos.totalElementos : 0} en total</span>
        </label>

        <Paginacion
          paginaActual={pagina}
          totalPaginas={datos ? datos.totalPaginas : 0}
          alCambiarPagina={cambiarPagina}
        />
      </div>
    </div>
  );
}
