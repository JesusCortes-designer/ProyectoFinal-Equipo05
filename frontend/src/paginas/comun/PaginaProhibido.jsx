import { Link } from 'react-router-dom';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useTituloPagina from '../../hooks/useTituloPagina';
import { RUTA_INICIO } from '../../utilidades/constantes';

// pagina 403: el usuario tiene sesion pero su rol no puede entrar a esa ruta
export default function PaginaProhibido() {
  useTituloPagina('Acceso denegado');
  const { usuario } = useAutenticacion();

  return (
    <div className="pagina-error">
      <p className="pagina-error__codigo">403</p>
      <h1>No tienes permiso para ver esta página</h1>
      <p>Tu rol no tiene acceso a esta sección.</p>
      <Link to={usuario ? RUTA_INICIO[usuario.rol] : '/login'} className="boton boton--primario">
        Volver al inicio
      </Link>
    </div>
  );
}
