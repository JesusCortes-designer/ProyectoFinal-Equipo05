import { Link } from 'react-router-dom';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import useTituloPagina from '../../hooks/useTituloPagina';
import { RUTA_INICIO } from '../../utilidades/constantes';

export default function PaginaNoEncontrada() {
  useTituloPagina('Página no encontrada');
  const { usuario } = useAutenticacion();

  return (
    <div className="pagina-error pagina-error--completa">
      <p className="pagina-error__codigo">ERROR 404</p>
      <h1>Esta página no existe</h1>
      <Link to={usuario ? RUTA_INICIO[usuario.rol] : '/login'} className="boton boton--primario">
        Ir al inicio
      </Link>
    </div>
  );
}
