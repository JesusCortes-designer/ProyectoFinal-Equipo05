import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { interpretarError } from '../utilidades/errores';
import { OPCIONES_TAMANO_PAGINA } from '../utilidades/constantes';

// listado con paginacion y filtros del lado del servidor.
// la pagina, el tamano y los filtros viven en la URL (?pagina=2&buscar=ana) y se mandan a la API como parametros.
// obtener(parametros, senal) debe regresar { contenido, pagina, tamano, totalElementos, totalPaginas }
export default function useListado(obtener, nombresFiltros = [], parametrosFijos = {}, tamanoInicial = 10) {
  const [parametrosUrl, setParametrosUrl] = useSearchParams();

  const paginaPedida = parseInt(parametrosUrl.get('pagina'), 10);
  const tamanoPedido = parseInt(parametrosUrl.get('tamano'), 10);
  const pagina = paginaPedida > 0 ? paginaPedida : 1;
  const tamano = OPCIONES_TAMANO_PAGINA.includes(tamanoPedido) ? tamanoPedido : tamanoInicial;

  const filtros = {};
  nombresFiltros.forEach((nombre) => {
    filtros[nombre] = parametrosUrl.get(nombre) || '';
  });

  const [estado, setEstado] = useState({ datos: null, cargando: true, error: null });
  const [recargas, setRecargas] = useState(0);

  const clave = JSON.stringify([pagina, tamano, filtros, parametrosFijos, recargas]);

  useEffect(() => {
    const controlador = new AbortController();
    setEstado((anterior) => ({ ...anterior, cargando: true, error: null }));

    obtener({ ...parametrosFijos, ...filtros, pagina, tamano }, controlador.signal)
      .then((datos) => setEstado({ datos, cargando: false, error: null }))
      .catch((error) => {
        const interpretado = interpretarError(error);
        if (interpretado.cancelado) return;
        setEstado({ datos: null, cargando: false, error: interpretado });
      });

    return () => controlador.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  const actualizarUrl = useCallback(
    (cambios) => {
      setParametrosUrl(
        (anteriores) => {
          const siguientes = new URLSearchParams(anteriores);
          Object.entries(cambios).forEach(([nombre, valor]) => {
            if (valor === '' || valor === null || valor === undefined) siguientes.delete(nombre);
            else siguientes.set(nombre, String(valor));
          });
          return siguientes;
        },
        { replace: false }
      );
    },
    [setParametrosUrl]
  );

  // si se borra el ultimo registro de una pagina se regresa a la anterior
  useEffect(() => {
    const datos = estado.datos;
    if (datos && datos.contenido.length === 0 && pagina > 1) {
      actualizarUrl({ pagina: Math.max(datos.totalPaginas, 1) });
    }
  }, [estado.datos, pagina, actualizarUrl]);

  return {
    datos: estado.datos,
    cargando: estado.cargando,
    error: estado.error,
    pagina,
    tamano,
    filtros,
    cambiarFiltro: (nombre, valor) => actualizarUrl({ [nombre]: valor, pagina: 1 }),
    cambiarPagina: (nuevaPagina) => actualizarUrl({ pagina: nuevaPagina }),
    cambiarTamano: (nuevoTamano) => actualizarUrl({ tamano: nuevoTamano, pagina: 1 }),
    recargar: () => setRecargas((n) => n + 1),
  };
}
