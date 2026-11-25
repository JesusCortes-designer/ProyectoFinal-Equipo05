import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../contexto/AutenticacionContexto';

// solo deja pasar a los usuarios con sesion y con alguno de los roles indicados
// sin sesion -> /login   |   con sesion pero rol incorrecto -> /prohibido (403)
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

// paginas publicas (login, registro): si ya hay sesion se manda al inicio del rol
export function RutaPublica({ destinoConSesion }) {
  const { usuario } = useAutenticacion();

  if (usuario) {
    return <Navigate to={destinoConSesion(usuario)} replace />;
  }

  return <Outlet />;
}
