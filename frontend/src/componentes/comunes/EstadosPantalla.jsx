import Icono from './Icono';

// estados que se repiten en toda la aplicacion: cargando, sin resultados y error de red

export function Cargando({ filas = 5, mensaje = 'Cargando...' }) {
  return (
    <div className="cargando" role="status" aria-live="polite" aria-busy="true">
      <span className="visualmente-oculto">{mensaje}</span>
      {Array.from({ length: filas }, (_, indice) => (
        <div key={indice} className="cargando__fila" />
      ))}
    </div>
  );
}

export function Girando({ mensaje = 'Cargando...' }) {
  return (
    <div className="girando" role="status" aria-live="polite">
      <span className="girando__rueda" />
      <span>{mensaje}</span>
    </div>
  );
}

export function SinResultados({ titulo = 'No se encontraron resultados', detalle = 'Prueba con otros filtros', children }) {
  return (
    <div className="estado-vacio">
      <Icono nombre="buscar" tamano={56} grosor={1.4} />
      <p className="estado-vacio__titulo">{titulo}</p>
      <p className="estado-vacio__detalle">{detalle}</p>
      {children}
    </div>
  );
}

export function ErrorRed({ error, alReintentar }) {
  const mensaje = error?.mensaje || 'No se pudo cargar la información';
  return (
    <div className="estado-vacio estado-vacio--error" role="alert">
      <Icono nombre="alerta" tamano={56} grosor={1.4} />
      <p className="estado-vacio__titulo">
        {error?.esErrorRed ? 'No se pudo conectar con el servidor' : 'Ocurrió un problema'}
      </p>
      <p className="estado-vacio__detalle">{mensaje}</p>
      {alReintentar && (
        <button type="button" className="boton boton--primario" onClick={alReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}
