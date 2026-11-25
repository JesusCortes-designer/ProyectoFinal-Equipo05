import { formatearEstado } from '../../utilidades/formato';

// color de la insignia segun el estado o rol que llegue de la API
const TIPOS = {
  DISPONIBLE: 'ok',
  EN_VIAJE: 'info',
  MANTENIMIENTO: 'aviso',
  PROGRAMADO: 'info',
  EN_CURSO: 'aviso',
  FINALIZADO: 'neutro',
  CANCELADO: 'peligro',
  CONFIRMADA: 'ok',
  CANCELADA: 'peligro',
  ACTIVO: 'ok',
  INACTIVO: 'peligro',
  ADMINISTRADOR: 'info',
  TAQUILLERO: 'aviso',
  CLIENTE: 'neutro',
};

export default function Insignia({ valor, texto }) {
  const tipo = TIPOS[valor] || 'neutro';
  return <span className={`insignia insignia--${tipo}`}>{texto || formatearEstado(valor)}</span>;
}
