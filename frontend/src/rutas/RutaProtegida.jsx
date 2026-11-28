import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../contexto/AutenticacionContexto';

export function RutaProtegida({ roles }) {
  const { usuario } = useAutenticacion();
  const ubicacion = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/prohibido" replace />;
  }

  return <Outlet />;
}

export function RutaPublica({ destinoConSesion }) {
  const { usuario } = useAutenticacion();

  if (usuario) {
    return <Navigate to={destinoConSesion(usuario)} replace />;
  }

  return <Outlet />;
}
