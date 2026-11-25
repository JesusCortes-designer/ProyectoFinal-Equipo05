import { useCallback, useEffect, useState } from 'react';
import { interpretarError } from '../utilidades/errores';

// carga un dato de la API al abrir la pagina y maneja cargando / error / reintentar
// consultar(senal) debe regresar una promesa con los datos
export default function useConsulta(consultar, dependencias = []) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: null });
  const [recargas, setRecargas] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    setEstado((anterior) => ({ ...anterior, cargando: true, error: null }));

    consultar(controlador.signal)
      .then((datos) => setEstado({ datos, cargando: false, error: null }))
      .catch((error) => {
        const interpretado = interpretarError(error);
        if (interpretado.cancelado) return;
        setEstado({ datos: null, cargando: false, error: interpretado });
      });

    return () => controlador.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, recargas]);

  const recargar = useCallback(() => setRecargas((n) => n + 1), []);

  return { ...estado, recargar };
}
