import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RUTA_INICIO } from '../../utilidades/constantes';
import { iniciales } from '../../utilidades/formato';
import { ETIQUETA_ROL } from '../../utilidades/menus';
import Icono from '../comunes/Icono';

// barra superior visible en toda la parte interna: titulo, datos del usuario, avatar, perfil y cerrar sesion
export default function BarraSuperior({ titulo, usuario, alAbrirMenu, alCerrarSesion }) {
  const [menuUsuario, setMenuUsuario] = useState(false);
  const contenedor = useRef(null);

  // cierra el menu del avatar al hacer clic fuera
  useEffect(() => {
    const alHacerClic = (evento) => {
      if (contenedor.current && !contenedor.current.contains(evento.target)) setMenuUsuario(false);
    };
    document.addEventListener('mousedown', alHacerClic);
    return () => document.removeEventListener('mousedown', alHacerClic);
  }, []);

  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

  return (
    <header className="barra-superior">
      <button type="button" className="barra-superior__menu" onClick={alAbrirMenu} aria-label="Abrir menú">
        <Icono nombre="menu" tamano={22} />
      </button>

      <h1 className="barra-superior__titulo">{titulo}</h1>

      <div className="barra-superior__usuario" ref={contenedor}>
        <div className="barra-superior__datos">
          <span className="barra-superior__nombre">{nombreCompleto}</span>
          <span className="barra-superior__correo">{usuario.correo}</span>
        </div>

        <button
          type="button"
          className="avatar"
          onClick={() => setMenuUsuario((abierto) => !abierto)}
          aria-label="Menú de usuario"
          aria-expanded={menuUsuario}
        >
          {iniciales(usuario.nombre, usuario.apellido)}
        </button>

        {menuUsuario && (
          <div className="menu-usuario" role="menu">
            <div className="menu-usuario__cabecera">
              <strong>{nombreCompleto}</strong>
              <span>{usuario.correo}</span>
              <span className="menu-usuario__rol">{ETIQUETA_ROL[usuario.rol]}</span>
            </div>
            <Link
              to={`${RUTA_INICIO[usuario.rol]}/perfil`}
              className="menu-usuario__opcion"
              role="menuitem"
              onClick={() => setMenuUsuario(false)}
            >
              <Icono nombre="usuario" tamano={16} /> Mi perfil
            </Link>
            <button type="button" className="menu-usuario__opcion" role="menuitem" onClick={alCerrarSesion}>
              <Icono nombre="salir" tamano={16} /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
