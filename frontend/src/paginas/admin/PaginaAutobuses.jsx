import Insignia from '../../componentes/comunes/Insignia';
import PaginaCrud from '../../componentes/datos/PaginaCrud';
import autobusServicio from '../../servicios/autobusServicio';
import { OPCIONES_ESTADO_AUTOBUS } from '../../utilidades/constantes';
import { cargarOpcionesTerminales } from '../../utilidades/opciones';
import { longitudMaxima, numeroEntre, requerido } from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Placa', clave: 'placa' },
  { titulo: 'Modelo', clave: 'modelo' },
  { titulo: 'Capacidad', render: (fila) => `${fila.capacidad} asientos` },
  { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
  { titulo: 'Terminal', clave: 'terminalNombre' },
];

const FILTROS = [
  { nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar por placa o modelo...' },
  { nombre: 'estado', tipo: 'seleccion', opciones: OPCIONES_ESTADO_AUTOBUS, etiquetaTodos: 'Todos' },
];

const CAMPOS = [
  {
    nombre: 'placa',
    etiqueta: 'Placa',
    marcador: 'ABC-123-A',
    ancho: 'mitad',
    reglas: [requerido('La placa es obligatoria'), longitudMaxima(20)],
  },
  {
    nombre: 'modelo',
    etiqueta: 'Modelo',
    marcador: 'Volvo 9800',
    ancho: 'mitad',
    reglas: [requerido('El modelo es obligatorio'), longitudMaxima(60)],
  },
  {
    nombre: 'capacidad',
    etiqueta: 'Capacidad (asientos)',
    tipo: 'numero',
    ancho: 'mitad',
    reglas: [requerido('La capacidad es obligatoria'), numeroEntre(10, 80, 'La capacidad debe estar entre 10 y 80 asientos')],
  },
  {
    nombre: 'estado',
    etiqueta: 'Estado',
    tipo: 'seleccion',
    ancho: 'mitad',
    opciones: OPCIONES_ESTADO_AUTOBUS,
    reglas: [requerido('El estado es obligatorio')],
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
  placa: fila.placa,
  modelo: fila.modelo,
  capacidad: fila.capacidad,
  estado: fila.estado,
  terminalId: fila.terminalId,
});
const describirFila = (fila) => `el autobús ${fila.placa}`;

export default function PaginaAutobuses() {
  return (
    <PaginaCrud
      titulo="Autobuses"
      encabezado="Gestión de autobuses"
      servicio={autobusServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Autobús"
      textoAgregar="Agregar autobús"
      mensajeVacio="No hay autobuses registrados"
    />
  );
}
