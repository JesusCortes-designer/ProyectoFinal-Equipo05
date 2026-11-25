import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DisenoPrincipal from './componentes/diseno/DisenoPrincipal';
import { ProveedorAutenticacion } from './contexto/AutenticacionContexto';
import { ProveedorAvisos } from './contexto/AvisosContexto';
import PaginaBoletos from './paginas/comun/PaginaBoletos';
import PaginaNoEncontrada from './paginas/comun/PaginaNoEncontrada';
import PaginaPerfil from './paginas/comun/PaginaPerfil';
import PaginaProhibido from './paginas/comun/PaginaProhibido';
import PaginaReservaciones from './paginas/comun/PaginaReservaciones';
import PaginaSeleccionAsientos from './paginas/comun/PaginaSeleccionAsientos';
import PaginaAutobuses from './paginas/admin/PaginaAutobuses';
import PaginaChoferes from './paginas/admin/PaginaChoferes';
import PaginaDashboardAdmin from './paginas/admin/PaginaDashboardAdmin';
import PaginaRutas from './paginas/admin/PaginaRutas';
import PaginaTerminales from './paginas/admin/PaginaTerminales';
import PaginaUsuarios from './paginas/admin/PaginaUsuarios';
import PaginaViajes from './paginas/admin/PaginaViajes';
import PaginaConfirmacion from './paginas/cliente/PaginaConfirmacion';
import PaginaInicioCliente from './paginas/cliente/PaginaInicioCliente';
import PaginaLogin from './paginas/publico/PaginaLogin';
import PaginaRecuperar from './paginas/publico/PaginaRecuperar';
import PaginaRegistro from './paginas/publico/PaginaRegistro';
import PaginaRestablecer from './paginas/publico/PaginaRestablecer';
import PaginaElegirViaje from './paginas/taquilla/PaginaElegirViaje';
import PaginaInicioTaquilla from './paginas/taquilla/PaginaInicioTaquilla';
import { RutaProtegida, RutaPublica } from './rutas/RutaProtegida';
import { RUTA_INICIO, ROLES } from './utilidades/constantes';

const destinoSegunRol = (usuario) => RUTA_INICIO[usuario.rol] || '/login';

export default function App() {
  return (
    <BrowserRouter>
      <ProveedorAvisos>
        <ProveedorAutenticacion>
          <Routes>
            {/* paginas publicas: si ya hay sesion mandan al inicio del rol */}
            <Route element={<RutaPublica destinoConSesion={destinoSegunRol} />}>
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="/registro" element={<PaginaRegistro />} />
              <Route path="/recuperar" element={<PaginaRecuperar />} />
              <Route path="/restablecer" element={<PaginaRestablecer />} />
            </Route>

            {/* cliente */}
            <Route element={<RutaProtegida roles={[ROLES.CLIENTE]} />}>
              <Route element={<DisenoPrincipal />}>
                <Route path="/cliente" element={<PaginaInicioCliente />} />
                <Route path="/cliente/viajes/:id/asientos" element={<PaginaSeleccionAsientos modo="cliente" />} />
                <Route path="/cliente/confirmacion" element={<PaginaConfirmacion />} />
                <Route path="/cliente/reservaciones" element={<PaginaReservaciones />} />
                <Route path="/cliente/perfil" element={<PaginaPerfil />} />
              </Route>
            </Route>

            {/* taquillero */}
            <Route element={<RutaProtegida roles={[ROLES.TAQUILLERO]} />}>
              <Route element={<DisenoPrincipal />}>
                <Route path="/taquilla" element={<PaginaInicioTaquilla />} />
                <Route path="/taquilla/vender" element={<PaginaElegirViaje />} />
                <Route path="/taquilla/vender/:id" element={<PaginaSeleccionAsientos modo="taquilla" />} />
                <Route path="/taquilla/boletos" element={<PaginaBoletos />} />
                <Route path="/taquilla/perfil" element={<PaginaPerfil />} />
              </Route>
            </Route>

            {/* administrador */}
            <Route element={<RutaProtegida roles={[ROLES.ADMINISTRADOR]} />}>
              <Route element={<DisenoPrincipal />}>
                <Route path="/admin" element={<PaginaDashboardAdmin />} />
                <Route path="/admin/terminales" element={<PaginaTerminales />} />
                <Route path="/admin/rutas" element={<PaginaRutas />} />
                <Route path="/admin/autobuses" element={<PaginaAutobuses />} />
                <Route path="/admin/choferes" element={<PaginaChoferes />} />
                <Route path="/admin/viajes" element={<PaginaViajes />} />
                <Route path="/admin/reservaciones" element={<PaginaReservaciones esAdministrador />} />
                <Route path="/admin/boletos" element={<PaginaBoletos />} />
                <Route path="/admin/usuarios" element={<PaginaUsuarios />} />
                <Route path="/admin/perfil" element={<PaginaPerfil />} />
              </Route>
            </Route>

            {/* 403 para cualquier rol con sesion */}
            <Route element={<RutaProtegida />}>
              <Route element={<DisenoPrincipal />}>
                <Route path="/prohibido" element={<PaginaProhibido />} />
              </Route>
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<PaginaNoEncontrada />} />
          </Routes>
        </ProveedorAutenticacion>
      </ProveedorAvisos>
    </BrowserRouter>
  );
}
