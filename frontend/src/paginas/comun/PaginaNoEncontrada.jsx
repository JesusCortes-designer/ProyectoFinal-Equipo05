import { Link } from 'react-router-dom';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useTituloPagina from '../../hooks/useTituloPagina';
import { RUTA_INICIO } from '../../utilidades/constantes';

export default function PaginaNoEncontrada() {
  useTituloPagina('Página no encontrada');
  const { usuario } = useAutenticacion();

  return (
    <div className="pagina-error pagina-error--completa">
      <p className="pagina-error__codigo">404</p>
      <h1>La página que buscas no existe</h1>
      <p>Revisa la dirección o regresa al inicio.</p>
      <Link to={usuario ? RUTA_INICIO[usuario.rol] : '/login'} className="boton boton--primario">
        Ir al inicio
      </Link>
    </div>
  );
}
