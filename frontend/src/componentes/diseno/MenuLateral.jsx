import { NavLink } from 'react-router-dom';
import Icono from '../comunes/Icono';
import Logo from '../comunes/Logo';

export default function MenuLateral({ opciones, abierto, alCerrar, alCerrarSesion }) {
  return (
    <aside className={`menu-lateral ${abierto ? 'menu-lateral--abierto' : ''}`} aria-label="Menú principal">
      <div className="menu-lateral__marca">
        <Logo tamano={38} />
        <div className="menu-lateral__nombre">
          <strong>PuntoBus</strong>
        </div>
        <button type="button" className="menu-lateral__cerrar" onClick={alCerrar} aria-label="Cerrar menú">
          <Icono nombre="x" tamano={20} />
        </button>
      </div>

      <nav className="menu-lateral__navegacion">
        {opciones.map((opcion) => (
          <NavLink
            key={opcion.ruta}
            to={opcion.ruta}
            end={opcion.exacta}
            className={({ isActive }) => `menu-lateral__enlace ${isActive ? 'menu-lateral__enlace--activo' : ''}`}
          >
            <Icono nombre={opcion.icono} tamano={20} />
            <span>{opcion.etiqueta}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="menu-lateral__salir" onClick={alCerrarSesion}>
        <Icono nombre="salir" tamano={20} />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
