// opciones del menu lateral de cada rol (coinciden con las pantallas del prototipo de Figma)
export const MENUS = {
  CLIENTE: [
    { ruta: '/cliente', etiqueta: 'Inicio', icono: 'inicio', exacta: true },
    { ruta: '/cliente/reservaciones', etiqueta: 'Mis reservaciones', icono: 'boleto' },
    { ruta: '/cliente/perfil', etiqueta: 'Mi perfil', icono: 'usuario' },
  ],
  TAQUILLERO: [
    { ruta: '/taquilla', etiqueta: 'Inicio', icono: 'inicio', exacta: true },
    { ruta: '/taquilla/vender', etiqueta: 'Vender boleto', icono: 'boleto' },
    { ruta: '/taquilla/boletos', etiqueta: 'Boletos', icono: 'lista' },
    { ruta: '/taquilla/perfil', etiqueta: 'Mi perfil', icono: 'usuario' },
  ],
  ADMINISTRADOR: [
    { ruta: '/admin', etiqueta: 'Dashboard', icono: 'grafica', exacta: true },
    { ruta: '/admin/terminales', etiqueta: 'Terminales', icono: 'ubicacion' },
    { ruta: '/admin/rutas', etiqueta: 'Rutas', icono: 'ruta' },
    { ruta: '/admin/autobuses', etiqueta: 'Autobuses', icono: 'autobus' },
    { ruta: '/admin/choferes', etiqueta: 'Choferes', icono: 'conductor' },
    { ruta: '/admin/viajes', etiqueta: 'Viajes', icono: 'calendario' },
    { ruta: '/admin/reservaciones', etiqueta: 'Reservaciones', icono: 'boleto' },
    { ruta: '/admin/boletos', etiqueta: 'Boletos', icono: 'lista' },
    { ruta: '/admin/usuarios', etiqueta: 'Usuarios', icono: 'usuario' },
  ],
};

export const ETIQUETA_ROL = {
  ADMINISTRADOR: 'Administrador',
  TAQUILLERO: 'Taquillero',
  CLIENTE: 'Cliente',
};
