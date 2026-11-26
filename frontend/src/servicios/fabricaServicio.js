import clienteApi from '../api/clienteApi';

// quita los filtros vacios para no mandar parametros de mas
export function limpiarParametros(parametros) {
  return Object.fromEntries(
    Object.entries(parametros || {}).filter(([, valor]) => valor !== '' && valor !== null && valor !== undefined)
  );
}

// el servidor entrega los registros del ultimo al primero (id descendente) y no se puede cambiar.
// esta funcion los muestra del primero al ultimo manteniendo la paginacion del servidor:
// calcula que registros le tocan a la pagina pedida, pide las paginas del servidor que los contienen y los voltea
export async function listarAscendente(listarDescendente, parametros, senal) {
  const tamano = Number(parametros.tamano) || 10;
  const paginaPedida = Math.max(Number(parametros.pagina) || 1, 1);

  const primera = await listarDescendente({ ...parametros, pagina: 1, tamano }, senal);
  const total = primera.totalElementos;
  const totalPaginas = Math.ceil(total / tamano);

  // lugar (empezando en 0) que ocupan en la lista descendente los registros de esta pagina
  const fin = total - (paginaPedida - 1) * tamano;
  const inicio = Math.max(fin - tamano, 0);
  const respuestaBase = { ...primera, pagina: paginaPedida, tamano, totalPaginas };

  if (fin <= 0) return { ...respuestaBase, contenido: [] };
  if (total <= tamano) return { ...respuestaBase, contenido: [...primera.contenido].reverse() };

  const paginaInicial = Math.floor(inicio / tamano) + 1;
  const paginaFinal = Math.floor((fin - 1) / tamano) + 1;
  const paginas = [];
  for (let numero = paginaInicial; numero <= paginaFinal; numero += 1) {
    paginas.push(numero === 1 ? primera : await listarDescendente({ ...parametros, pagina: numero, tamano }, senal));
  }
  const juntos = paginas.flatMap((pagina) => pagina.contenido);
  const desde = inicio - (paginaInicial - 1) * tamano;
  const contenido = juntos.slice(desde, desde + (fin - inicio)).reverse();
  return { ...respuestaBase, contenido };
}

// arma las 5 operaciones basicas (listar, obtener, crear, actualizar, eliminar) de un modulo
// con ascendente = true la lista se muestra del id menor al mayor
export function crearServicioCrud(rutaBase, ascendente = false) {
  const listarDescendente = (parametros, senal) =>
    clienteApi.get(rutaBase, { params: limpiarParametros(parametros), signal: senal }).then((r) => r.data);

  return {
    listarDescendente,
    listar: ascendente ? (parametros, senal) => listarAscendente(listarDescendente, parametros, senal) : listarDescendente,
    obtener: (id) => clienteApi.get(`${rutaBase}/${id}`).then((r) => r.data),
    crear: (carga) => clienteApi.post(rutaBase, carga).then((r) => r.data),
    actualizar: (id, carga) => clienteApi.put(`${rutaBase}/${id}`, carga).then((r) => r.data),
    eliminar: (id) => clienteApi.delete(`${rutaBase}/${id}`).then((r) => r.data),
  };
}
