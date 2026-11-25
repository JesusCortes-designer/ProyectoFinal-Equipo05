import Insignia from '../../componentes/comunes/Insignia';
import PaginaCrud from '../../componentes/datos/PaginaCrud';
import usuarioServicio from '../../servicios/usuarioServicio';
import { OPCIONES_ROL } from '../../utilidades/constantes';
import {
  contrasenaSegura,
  correoValido,
  longitudMaxima,
  numeroEntre,
  requerido,
  telefonoValido,
} from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Nombre completo', render: (fila) => `${fila.nombre} ${fila.apellido}` },
  { titulo: 'Edad', clave: 'edad' },
  { titulo: 'Correo electrónico', clave: 'correo' },
  { titulo: 'Rol', render: (fila) => <Insignia valor={fila.rol} /> },
  { titulo: 'Estado', render: (fila) => <Insignia valor={fila.activo ? 'ACTIVO' : 'INACTIVO'} /> },
];

const FILTROS = [
  { nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar por nombre o correo...' },
  { nombre: 'rol', tipo: 'seleccion', opciones: OPCIONES_ROL, etiquetaTodos: 'Rol: todos' },
];

// al crear se piden correo y contraseña; al editar no (el backend no los modifica)
const obtenerCampos = (modo) => {
  const creacion = modo === 'creacion';
  const campos = [
    {
      nombre: 'nombre',
      etiqueta: 'Nombre',
      ancho: 'mitad',
      icono: 'usuario',
      reglas: [requerido('El nombre es obligatorio'), longitudMaxima(60)],
    },
    {
      nombre: 'apellido',
      etiqueta: 'Apellido',
      ancho: 'mitad',
      reglas: [requerido('El apellido es obligatorio'), longitudMaxima(60)],
    },
  ];

  if (creacion) {
    campos.push(
      {
        nombre: 'correo',
        etiqueta: 'Correo electrónico',
        tipo: 'correo',
        icono: 'correo',
        marcador: 'correo@ejemplo.com',
        reglas: [requerido('El correo es obligatorio'), correoValido, longitudMaxima(120)],
      },
      {
        nombre: 'contrasena',
        etiqueta: 'Contraseña',
        tipo: 'contrasena',
        icono: 'candado',
        autoComplete: 'new-password',
        reglas: [requerido('La contraseña es obligatoria'), contrasenaSegura],
      }
    );
  }

  campos.push(
    {
      nombre: 'edad',
      etiqueta: 'Edad',
      tipo: 'numero',
      ancho: 'mitad',
      reglas: [requerido('La edad es obligatoria'), numeroEntre(1, 120, 'La edad debe estar entre 1 y 120')],
    },
    {
      nombre: 'rol',
      etiqueta: 'Rol',
      tipo: 'seleccion',
      ancho: 'mitad',
      opciones: OPCIONES_ROL,
      reglas: [requerido('El rol es obligatorio')],
    },
    {
      nombre: 'telefono',
      etiqueta: creacion ? 'Teléfono (obligatorio para clientes)' : 'Teléfono (opcional)',
      tipo: 'telefono',
      icono: 'telefono',
      marcador: '+525512345678',
      reglas: [
        (valor, valores) =>
          creacion && valores.rol === 'CLIENTE' && !String(valor || '').trim()
            ? 'El teléfono es obligatorio para los clientes'
            : '',
        telefonoValido,
      ],
    }
  );

  if (!creacion) {
    campos.push({
      nombre: 'activo',
      etiqueta: 'Usuario activo',
      tipo: 'casilla',
      ayuda: 'Usuario activo (si se desmarca no podrá iniciar sesión)',
    });
  }

  return campos;
};

const aValores = (fila) => ({
  nombre: fila.nombre,
  apellido: fila.apellido,
  edad: fila.edad,
  rol: fila.rol,
  telefono: '',
  activo: fila.activo,
});
const describirFila = (fila) => `al usuario ${fila.nombre} ${fila.apellido} (${fila.correo})`;

export default function PaginaUsuarios() {
  return (
    <PaginaCrud
      titulo="Usuarios"
      encabezado="Usuarios del sistema"
      servicio={usuarioServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Usuario"
      textoAgregar="Agregar usuario"
      mensajeVacio="No se encontraron usuarios"
    />
  );
}
