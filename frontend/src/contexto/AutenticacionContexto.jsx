import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CLAVE_TOKEN, CLAVE_USUARIO, registrarAlExpirarSesion } from '../api/clienteApi';
import * as autenticacionServicio from '../servicios/autenticacionServicio';

const ContextoAutenticacion = createContext(null);

// lee el usuario que quedo guardado en el navegador (si hay token)
function leerUsuarioGuardado() {
  try {
    if (!localStorage.getItem(CLAVE_TOKEN)) return null;
    const texto = localStorage.getItem(CLAVE_USUARIO);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

export function ProveedorAutenticacion({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);
  const [sesionExpirada, setSesionExpirada] = useState(false);

  const limpiarSesion = useCallback(() => {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    setUsuario(null);
  }, []);

  // si el backend contesta 401 en cualquier peticion se cierra la sesion
  useEffect(() => {
    registrarAlExpirarSesion(() => {
      limpiarSesion();
      setSesionExpirada(true);
    });
  }, [limpiarSesion]);

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    const datos = await autenticacionServicio.iniciarSesion(correo, contrasena);
    localStorage.setItem(CLAVE_TOKEN, datos.token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(datos.usuario));
    setUsuario(datos.usuario);
    setSesionExpirada(false);
    return datos.usuario;
  }, []);

  const cerrarSesion = useCallback(async () => {
    try {
      await autenticacionServicio.cerrarSesion();
    } catch {
      // aunque falle el logout en el servidor se limpia la sesion local
    }
    limpiarSesion();
  }, [limpiarSesion]);

  const valor = useMemo(
    () => ({ usuario, sesionExpirada, iniciarSesion, cerrarSesion }),
    [usuario, sesionExpirada, iniciarSesion, cerrarSesion]
  );

  return <ContextoAutenticacion.Provider value={valor}>{children}</ContextoAutenticacion.Provider>;
}

export function useAutenticacion() {
  return useContext(ContextoAutenticacion);
}
