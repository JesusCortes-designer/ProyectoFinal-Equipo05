// prefijos internacionales que se pueden elegir en los campos de teléfono
export const PREFIJOS_TELEFONICOS = [
  { valor: '+52', etiqueta: '+52' }, // México
  { valor: '+1', etiqueta: '+1' }, // EE. UU. y Canadá
  { valor: '+34', etiqueta: '+34' }, // España
  { valor: '+53', etiqueta: '+53' }, // Cuba
  { valor: '+54', etiqueta: '+54' }, // Argentina
  { valor: '+55', etiqueta: '+55' }, // Brasil
  { valor: '+56', etiqueta: '+56' }, // Chile
  { valor: '+57', etiqueta: '+57' }, // Colombia
  { valor: '+51', etiqueta: '+51' }, // Perú
  { valor: '+58', etiqueta: '+58' }, // Venezuela
  { valor: '+591', etiqueta: '+591' }, // Bolivia
  { valor: '+593', etiqueta: '+593' }, // Ecuador
  { valor: '+595', etiqueta: '+595' }, // Paraguay
  { valor: '+598', etiqueta: '+598' }, // Uruguay
  { valor: '+502', etiqueta: '+502' }, // Guatemala
  { valor: '+503', etiqueta: '+503' }, // El Salvador
  { valor: '+504', etiqueta: '+504' }, // Honduras
  { valor: '+505', etiqueta: '+505' }, // Nicaragua
  { valor: '+506', etiqueta: '+506' }, // Costa Rica
  { valor: '+507', etiqueta: '+507' }, // Panamá
  { valor: '+33', etiqueta: '+33' }, // Francia
  { valor: '+39', etiqueta: '+39' }, // Italia
  { valor: '+44', etiqueta: '+44' }, // Reino Unido
  { valor: '+49', etiqueta: '+49' }, // Alemania
  { valor: '+81', etiqueta: '+81' }, // Japón
  { valor: '+86', etiqueta: '+86' }, // China
  { valor: '+91', etiqueta: '+91' }, // India
];

export const PREFIJO_PREDETERMINADO = '+52';

// del más largo al más corto, para que +593 no se confunda con otro prefijo
const PREFIJOS_ORDENADOS = [...PREFIJOS_TELEFONICOS].sort(
  (a, b) => b.valor.length - a.valor.length
);

// "+525512345678" -> { prefijo: "+52", numero: "5512345678" }
export function separarTelefono(valor) {
  const texto = String(valor || '').trim();
  if (!texto.startsWith('+')) {
    return { prefijo: PREFIJO_PREDETERMINADO, numero: texto.replace(/\D/g, '') };
  }
  const encontrado = PREFIJOS_ORDENADOS.find((prefijo) => texto.startsWith(prefijo.valor));
  if (!encontrado) {
    return { prefijo: PREFIJO_PREDETERMINADO, numero: texto.replace(/\D/g, '') };
  }
  return { prefijo: encontrado.valor, numero: texto.slice(encontrado.valor.length).replace(/\D/g, '') };
}

// ("+52", "5512345678") -> "+525512345678"; si no hay número queda vacío
export function unirTelefono(prefijo, numero) {
  const digitos = String(numero || '').replace(/\D/g, '');
  return digitos ? `${prefijo}${digitos}` : '';
}