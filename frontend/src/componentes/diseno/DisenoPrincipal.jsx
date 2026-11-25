import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../../contexto/AutenticacionContexto';
import { MENUS } from '../../utilidades/menus';
import BarraSuperior from './BarraSuperior';
import MenuLateral from './MenuLateral';

// estructura de toda la parte interna: menu lateral, barra superior y el contenido de cada pagina
export default function DisenoPrincipal() {
  const { usuario, cerrarSesion } = useAutenticacion();
  const ubicacion = useLocation();
  const [titulo, setTitulo] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const establecerTitulo = useCallback((nuevoTitulo) => setTitulo(nuevoTitulo), []);

  // en celular el menu se cierra al cambiar de pagina
  useEffect(() => {
    setMenuAbierto(false);
  }, [ubicacion.pathname]);

  return (
    <div className="diseno">
      <MenuLateral
        opciones={MENUS[usuario.rol] || []}
        abierto={menuAbierto}
        alCerrar={() => setMenuAbierto(false)}
        alCerrarSesion={cerrarSesion}
      />
      {menuAbierto && <div className="diseno__velo" onClick={() => setMenuAbierto(false)} aria-hidden="true" />}

      <div className="diseno__principal">
        <BarraSuperior
          titulo={titulo}
          usuario={usuario}
          alAbrirMenu={() => setMenuAbierto(true)}
          alCerrarSesion={cerrarSesion}
        />
        <main className="diseno__contenido">
          <Outlet context={{ establecerTitulo }} />
        </main>
      </div>
    </div>
  );
}
