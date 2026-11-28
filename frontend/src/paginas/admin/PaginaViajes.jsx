import Insignia from '../../componentes/comunes/Insignia';
import PaginaCrud from '../../componentes/datos/PaginaCrud';
import viajeServicio from '../../servicios/viajeServicio';
import { OPCIONES_ESTADO_VIAJE } from '../../utilidades/constantes';
import { aValorFechaHora, formatearFechaHora, formatearMoneda } from '../../utilidades/formato';
import { cargarOpcionesAutobuses, cargarOpcionesChoferes, cargarOpcionesRutas } from '../../utilidades/opciones';
import { requerido } from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Ruta', render: (fila) => `${fila.origen} → ${fila.destino}` },
  { titulo: 'Salida', render: (fila) => formatearFechaHora(fila.fechaSalida) },
  { titulo: 'Llegada', render: (fila) => formatearFechaHora(fila.fechaLlegada) },
  { titulo: 'Autobús', clave: 'autobusPlaca' },
  { titulo: 'Chofer', clave: 'choferNombre' },
  { titulo: 'Precio', render: (fila) => formatearMoneda(fila.precio) },
  { titulo: 'Estado', render: (fila) => <Insignia valor={fila.estado} /> },
];

const FILTROS = [
  { nombre: 'origen', tipo: 'busqueda', marcador: 'Buscar por origen...' },
  { nombre: 'destino', tipo: 'busqueda', marcador: 'Buscar por destino...' },
  { nombre: 'estado', tipo: 'seleccion', opciones: OPCIONES_ESTADO_VIAJE, etiquetaTodos: 'Todos' },
];

const CAMPOS = [
  {
    nombre: 'rutaId',
    etiqueta: 'Ruta',
    tipo: 'seleccion',
    numerico: true,
    cargarOpciones: cargarOpcionesRutas,
    reglas: [requerido('La ruta es obligatoria')],
  },
  {
    nombre: 'autobusId',
    etiqueta: 'Autobús',
    tipo: 'seleccion',
    numerico: true,
    ancho: 'mitad',
    cargarOpciones: cargarOpcionesAutobuses,
    reglas: [requerido('El autobús es obligatorio')],
  },
  {
    nombre: 'choferId',
    etiqueta: 'Chofer',
    tipo: 'seleccion',
    numerico: true,
    ancho: 'mitad',
    cargarOpciones: cargarOpcionesChoferes,
    reglas: [requerido('El chofer es obligatorio')],
  },
  {
    nombre: 'fechaSalida',
    etiqueta: 'Fecha y hora de salida',
    tipo: 'fechaHora',
    ancho: 'mitad',
    reglas: [requerido('La fecha de salida es obligatoria')],
  },
  {
    nombre: 'fechaLlegada',
    etiqueta: 'Fecha y hora de llegada',
    tipo: 'fechaHora',
    ancho: 'mitad',
    reglas: [
      requerido('La fecha de llegada es obligatoria'),
      (valor, valores) =>
        valor && valores.fechaSalida && valor <= valores.fechaSalida ? 'La llegada debe ser posterior a la salida' : '',
    ],
  },
  {
    nombre: 'estado',
    etiqueta: 'Estado',
    tipo: 'seleccion',
    valorInicial: 'PROGRAMADO',
    opciones: OPCIONES_ESTADO_VIAJE,
    reglas: [requerido('El estado es obligatorio')],
  },
];

const obtenerCampos = () => CAMPOS;
const aValores = (fila) => ({
  rutaId: fila.rutaId,
  autobusId: fila.autobusId,
  choferId: fila.choferId,
  fechaSalida: aValorFechaHora(fila.fechaSalida),
  fechaLlegada: aValorFechaHora(fila.fechaLlegada),
  estado: fila.estado,
});
const describirFila = (fila) => `el viaje ${fila.origen} → ${fila.destino} del ${formatearFechaHora(fila.fechaSalida)}`;

export default function PaginaViajes() {
  return (
    <PaginaCrud
      titulo="Viajes"
      encabezado="Programación de Viajes"
      servicio={viajeServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Viaje"
      textoAgregar="Programar Viaje"
      mensajeVacio="No hay viajes programados"
    />
  );
}
