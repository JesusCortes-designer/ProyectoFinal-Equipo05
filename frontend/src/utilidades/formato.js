// funciones para mostrar fechas, dinero y textos en pantalla

export function formatearFechaHora(fechaIso) {
  if (!fechaIso) return '—';
  return new Date(fechaIso).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });
}

export function formatearHora(fechaIso) {
  if (!fechaIso) return '—';
  return new Date(fechaIso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

export function formatearFecha(fechaIso) {
  if (!fechaIso) return '—';
  return new Date(fechaIso).toLocaleDateString('es-MX', { dateStyle: 'medium' });
}

export function formatearMoneda(cantidad) {
  const numero = Number(cantidad ?? 0);
  return numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export function formatearDuracion(minutos) {
  if (!minutos && minutos !== 0) return '—';
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) return `${resto} min`;
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`;
}

// EN_VIAJE -> En viaje
export function formatearEstado(texto) {
  if (!texto) return '—';
  const limpio = String(texto).replace(/_/g, ' ').toLowerCase();
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

export function iniciales(nombre = '', apellido = '') {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || 'U';
}

// el input datetime-local usa "2026-11-24T13:00", el backend manda "2026-11-24T13:00:00"
export function aValorFechaHora(fechaIso) {
  return fechaIso ? String(fechaIso).slice(0, 16) : '';
}

export function deValorFechaHora(valor) {
  if (!valor) return null;
  return valor.length === 16 ? `${valor}:00` : valor;
}
