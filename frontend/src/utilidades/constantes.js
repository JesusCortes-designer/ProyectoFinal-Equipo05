// roles tal como los regresa el backend
export const ROLES = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  TAQUILLERO: 'TAQUILLERO',
  CLIENTE: 'CLIENTE',
};

// pagina de inicio de cada rol
export const RUTA_INICIO = {
  ADMINISTRADOR: '/admin',
  TAQUILLERO: '/taquilla',
  CLIENTE: '/cliente',
};

export const OPCIONES_ROL = [
  { valor: 'ADMINISTRADOR', etiqueta: 'Administrador' },
  { valor: 'TAQUILLERO', etiqueta: 'Taquillero' },
  { valor: 'CLIENTE', etiqueta: 'Cliente' },
];

export const OPCIONES_ESTADO_AUTOBUS = [
  { valor: 'DISPONIBLE', etiqueta: 'Disponible' },
  { valor: 'EN_VIAJE', etiqueta: 'En viaje' },
  { valor: 'MANTENIMIENTO', etiqueta: 'Mantenimiento' },
];

export const OPCIONES_ESTADO_VIAJE = [
  { valor: 'PROGRAMADO', etiqueta: 'Programado' },
  { valor: 'EN_CURSO', etiqueta: 'En curso' },
  { valor: 'FINALIZADO', etiqueta: 'Finalizado' },
  { valor: 'CANCELADO', etiqueta: 'Cancelado' },
];

export const OPCIONES_ESTADO_RESERVACION = [
  { valor: 'CONFIRMADA', etiqueta: 'Confirmada' },
  { valor: 'CANCELADA', etiqueta: 'Cancelada' },
];

export const OPCIONES_ESTADO_BOLETO = [
  { valor: 'ACTIVO', etiqueta: 'Activo' },
  { valor: 'CANCELADO', etiqueta: 'Cancelado' },
];

export const OPCIONES_TAMANO_PAGINA = [5, 10, 20, 50];
