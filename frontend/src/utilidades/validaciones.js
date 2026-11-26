// cada regla recibe (valor, valores) y regresa el mensaje de error o '' si todo esta bien
// son las mismas reglas que valida el backend con Bean Validation

export const REGEX_CONTRASENA = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const REGEX_TELEFONO = /^\+[0-9]{10,15}$/;
export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const estaVacio = (valor) =>
  valor === undefined || valor === null || (Array.isArray(valor) ? valor.length === 0 : String(valor).trim() === '');

export const requerido = (mensaje = 'Este campo es obligatorio') => (valor) =>
  estaVacio(valor) ? mensaje : '';

export const correoValido = (valor) =>
  estaVacio(valor) || REGEX_CORREO.test(String(valor).trim()) ? '' : 'El correo no es válido';

export const contrasenaSegura = (valor) =>
  estaVacio(valor) || REGEX_CONTRASENA.test(valor)
    ? ''
    : 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial';

export const telefonoValido = (valor) =>
  estaVacio(valor) || REGEX_TELEFONO.test(String(valor).trim())
    ? ''
    : 'El teléfono no es válido: solo dígitos, entre 10 y 15 contando la lada';

export const longitudMaxima = (maximo) => (valor) =>
  estaVacio(valor) || String(valor).length <= maximo ? '' : `Admite máximo ${maximo} caracteres`;

export const numeroEntre = (minimo, maximo, mensaje) => (valor) => {
  if (estaVacio(valor)) return '';
  const numero = Number(valor);
  if (Number.isNaN(numero) || numero < minimo || numero > maximo) {
    return mensaje || `Debe estar entre ${minimo} y ${maximo}`;
  }
  return '';
};

export const numeroMinimo = (minimo, mensaje) => (valor) => {
  if (estaVacio(valor)) return '';
  const numero = Number(valor);
  return Number.isNaN(numero) || numero < minimo ? mensaje || `El mínimo es ${minimo}` : '';
};

export const coincideCon = (otroCampo, mensaje) => (valor, valores) =>
  valor === valores[otroCampo] ? '' : mensaje;

// corre todas las reglas de un campo y regresa el primer error
export function validarCampo(reglas, valor, valores) {
  for (const regla of reglas || []) {
    const mensaje = regla(valor, valores);
    if (mensaje) return mensaje;
  }
  return '';
}
