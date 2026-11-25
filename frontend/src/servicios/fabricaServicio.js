import clienteApi from '../api/clienteApi';

// quita los filtros vacios para no mandar parametros de mas
export function limpiarParametros(parametros) {
  return Object.fromEntries(
    Object.entries(parametros || {}).filter(([, valor]) => valor !== '' && valor !== null && valor !== undefined)
  );
}

// arma las 5 operaciones basicas (listar, obtener, crear, actualizar, eliminar) de un modulo
export function crearServicioCrud(rutaBase) {
  return {
    listar: (parametros, senal) =>
      clienteApi.get(rutaBase, { params: limpiarParametros(parametros), signal: senal }).then((r) => r.data),
    obtener: (id) => clienteApi.get(`${rutaBase}/${id}`).then((r) => r.data),
    crear: (carga) => clienteApi.post(rutaBase, carga).then((r) => r.data),
    actualizar: (id, carga) => clienteApi.put(`${rutaBase}/${id}`, carga).then((r) => r.data),
    eliminar: (id) => clienteApi.delete(`${rutaBase}/${id}`).then((r) => r.data),
  };
}
