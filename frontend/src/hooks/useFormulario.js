import { useCallback, useRef, useState } from 'react';
import { validarCampo } from '../utilidades/validaciones';

// maneja los valores de un formulario y sus errores (se muestran bajo cada input)
// esquema: { nombreCampo: [regla1, regla2] }
export default function useFormulario(valoresIniciales, esquema) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const valoresActuales = useRef(valoresIniciales);
  const tocados = useRef(new Set());

  // valida en tiempo real todos los campos que el usuario ya toco
  const revalidarTocados = useCallback(
    (nuevosValores, erroresActuales) => {
      const nuevos = { ...erroresActuales };
      tocados.current.forEach((nombre) => {
        const mensaje = validarCampo(esquema[nombre], nuevosValores[nombre], nuevosValores);
        if (mensaje) nuevos[nombre] = mensaje;
        else delete nuevos[nombre];
      });
      return nuevos;
    },
    [esquema]
  );

  const cambiar = useCallback(
    (nombre, valor) => {
      tocados.current.add(nombre);
      const nuevosValores = { ...valoresActuales.current, [nombre]: valor };
      valoresActuales.current = nuevosValores;
      setValores(nuevosValores);
      setErrores((erroresActuales) => revalidarTocados(nuevosValores, erroresActuales));
    },
    [revalidarTocados]
  );

  // al salir del input tambien se valida
  const alSalir = useCallback(
    (nombre) => {
      tocados.current.add(nombre);
      setErrores((erroresActuales) => revalidarTocados(valoresActuales.current, erroresActuales));
    },
    [revalidarTocados]
  );

  // al enviar se validan todos los campos; regresa true si no hay errores
  const validarTodo = useCallback(() => {
    const nuevos = {};
    Object.keys(esquema).forEach((nombre) => {
      tocados.current.add(nombre);
      const mensaje = validarCampo(esquema[nombre], valoresActuales.current[nombre], valoresActuales.current);
      if (mensaje) nuevos[nombre] = mensaje;
    });
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  }, [esquema]);

  // errores que manda el backend (respuesta 422 con "campos")
  const establecerErrores = useCallback((camposServidor) => {
    setErrores((actuales) => ({ ...actuales, ...camposServidor }));
  }, []);

  const reiniciar = useCallback((nuevosValores) => {
    tocados.current = new Set();
    valoresActuales.current = nuevosValores;
    setValores(nuevosValores);
    setErrores({});
  }, []);

  return { valores, errores, cambiar, alSalir, validarTodo, establecerErrores, reiniciar };
}
