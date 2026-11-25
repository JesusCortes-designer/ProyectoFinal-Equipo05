import autobusServicio from '../servicios/autobusServicio';
import choferServicio from '../servicios/choferServicio';
import rutaServicio from '../servicios/rutaServicio';
import terminalServicio from '../servicios/terminalServicio';

// el backend permite maximo 100 registros por pagina
const PARAMETROS_OPCIONES = { pagina: 1, tamano: 100 };

// listas para los selects de los formularios: [{ valor, etiqueta }]
export const cargarOpcionesTerminales = () =>
  terminalServicio
    .listar(PARAMETROS_OPCIONES)
    .then((pagina) =>
      pagina.contenido.map((terminal) => ({ valor: terminal.id, etiqueta: `${terminal.nombre} (${terminal.ciudad})` }))
    );

export const cargarOpcionesRutas = () =>
  rutaServicio
    .listar(PARAMETROS_OPCIONES)
    .then((pagina) =>
      pagina.contenido.map((ruta) => ({ valor: ruta.id, etiqueta: `${ruta.origen} → ${ruta.destino}` }))
    );

export const cargarOpcionesAutobuses = () =>
  autobusServicio
    .listar(PARAMETROS_OPCIONES)
    .then((pagina) =>
      pagina.contenido.map((autobus) => ({ valor: autobus.id, etiqueta: `${autobus.placa} · ${autobus.modelo}` }))
    );

export const cargarOpcionesChoferes = () =>
  choferServicio
    .listar(PARAMETROS_OPCIONES)
    .then((pagina) =>
      pagina.contenido.map((chofer) => ({ valor: chofer.id, etiqueta: `${chofer.nombre} ${chofer.apellido}` }))
    );
