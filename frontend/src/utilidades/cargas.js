import { deValorFechaHora } from './formato';

// convierte los valores de un formulario en el JSON que espera el backend
// campos: la lista de campos del formulario (para saber el tipo de cada uno)
export function construirCarga(campos, valores) {
  const carga = {};
  campos.forEach((campo) => {
    const valor = valores[campo.nombre];
    const vacio = valor === '' || valor === null || valor === undefined;

    if (campo.tipo === 'seleccionMultiple') {
      carga[campo.nombre] = valor || [];
    } else if (campo.tipo === 'casilla') {
      carga[campo.nombre] = Boolean(valor);
    } else if (vacio) {
      carga[campo.nombre] = null;
    } else if (campo.tipo === 'numero' || campo.numerico) {
      carga[campo.nombre] = Number(valor);
    } else if (campo.tipo === 'fechaHora') {
      carga[campo.nombre] = deValorFechaHora(valor);
    } else if (typeof valor === 'string') {
      carga[campo.nombre] = valor.trim();
    } else {
      carga[campo.nombre] = valor;
    }
  });
  return carga;
}

// valores iniciales vacios segun el tipo de cada campo
export function valoresVaciosDe(campos) {
  const valores = {};
  campos.forEach((campo) => {
    if (campo.tipo === 'seleccionMultiple') valores[campo.nombre] = [];
    else if (campo.tipo === 'casilla') valores[campo.nombre] = campo.valorInicial ?? false;
    else valores[campo.nombre] = campo.valorInicial ?? '';
  });
  return valores;
}
