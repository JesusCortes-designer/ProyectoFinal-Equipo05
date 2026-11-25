import PaginaCrud from '../../componentes/datos/PaginaCrud';
import choferServicio from '../../servicios/choferServicio';
import { cargarOpcionesTerminales } from '../../utilidades/opciones';
import { longitudMaxima, requerido, telefonoValido } from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Nombre', render: (fila) => `${fila.nombre} ${fila.apellido}` },
  { titulo: 'Licencia', clave: 'licencia' },
  { titulo: 'Teléfono', clave: 'telefono' },
  { titulo: 'Terminal', clave: 'terminalNombre' },
];

const FILTROS = [{ nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar chofer por nombre o licencia...' }];

const CAMPOS = [
  {
    nombre: 'nombre',
    etiqueta: 'Nombre',
    marcador: 'Alfonso',
    ancho: 'mitad',
    reglas: [requerido('El nombre es obligatorio'), longitudMaxima(60)],
  },
  {
    nombre: 'apellido',
    etiqueta: 'Apellido',
    marcador: 'Ramírez',
    ancho: 'mitad',
    reglas: [requerido('El apellido es obligatorio'), longitudMaxima(60)],
  },
  {
    nombre: 'licencia',
    etiqueta: 'Licencia',
    marcador: 'LIC-123456',
    ancho: 'mitad',
    reglas: [requerido('La licencia es obligatoria'), longitudMaxima(30)],
  },
  {
    nombre: 'telefono',
    etiqueta: 'Teléfono',
    tipo: 'telefono',
    marcador: '+525512345678',
    ancho: 'mitad',
    reglas: [requerido('El teléfono es obligatorio'), telefonoValido],
  },
  {
    nombre: 'terminalId',
    etiqueta: 'Terminal',
    tipo: 'seleccion',
    numerico: true,
    cargarOpciones: cargarOpcionesTerminales,
    reglas: [requerido('La terminal es obligatoria')],
  },
];

const obtenerCampos = () => CAMPOS;
const aValores = (fila) => ({
  nombre: fila.nombre,
  apellido: fila.apellido,
  licencia: fila.licencia,
  telefono: fila.telefono,
  terminalId: fila.terminalId,
});
const describirFila = (fila) => `al chofer ${fila.nombre} ${fila.apellido}`;

export default function PaginaChoferes() {
  return (
    <PaginaCrud
      titulo="Choferes"
      encabezado="Gestión de choferes"
      servicio={choferServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Chofer"
      textoAgregar="Agregar chofer"
      mensajeVacio="No hay choferes registrados"
    />
  );
}
