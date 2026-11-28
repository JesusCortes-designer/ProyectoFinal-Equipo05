import PaginaCrud from '../../componentes/datos/PaginaCrud';
import rutaServicio from '../../servicios/rutaServicio';
import { formatearDuracion, formatearMoneda } from '../../utilidades/formato';
import { cargarOpcionesTerminales } from '../../utilidades/opciones';
import { longitudMaxima, numeroMinimo, requerido } from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Ruta', render: (fila) => `${fila.origen} → ${fila.destino}` },
  { titulo: 'Distancia', render: (fila) => `${fila.distanciaKm} km` },
  { titulo: 'Duración', render: (fila) => formatearDuracion(fila.duracionMinutos) },
  { titulo: 'Precio Base', render: (fila) => formatearMoneda(fila.precioBase) },
  { titulo: 'Terminales', render: (fila) => fila.terminales.join(', ') },
];

const FILTROS = [{ nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar ruta...' }];

const CAMPOS = [
  {
    nombre: 'origen',
    etiqueta: 'Origen',
    marcador: 'Ciudad de México',
    ancho: 'mitad',
    reglas: [requerido('El origen es obligatorio'), longitudMaxima(80)],
  },
  {
    nombre: 'destino',
    etiqueta: 'Destino',
    marcador: 'Puebla',
    ancho: 'mitad',
    reglas: [requerido('El destino es obligatorio'), longitudMaxima(80)],
  },
  {
    nombre: 'distanciaKm',
    etiqueta: 'Distancia (km)',
    tipo: 'numero',
    ancho: 'mitad',
    atributos: { step: '0.1', min: 1 },
    reglas: [requerido('La distancia es obligatoria'), numeroMinimo(1, 'La distancia mínima es 1 km')],
  },
  {
    nombre: 'duracionMinutos',
    etiqueta: 'Duración (minutos)',
    tipo: 'numero',
    ancho: 'mitad',
    reglas: [requerido('La duración es obligatoria'), numeroMinimo(1, 'La duración mínima es 1 minuto')],
  },
  {
    nombre: 'precioBase',
    etiqueta: 'Precio base (MXN)',
    tipo: 'numero',
    atributos: { step: '0.01', min: 1 },
    reglas: [requerido('El precio es obligatorio'), numeroMinimo(1, 'El precio mínimo es 1')],
  },
  {
    nombre: 'terminalIds',
    etiqueta: 'Terminales por las que pasa la ruta',
    tipo: 'seleccionMultiple',
    cargarOpciones: cargarOpcionesTerminales,
    reglas: [requerido('Selecciona al menos una terminal')],
  },
];

// atributos extra de los inputs numericos (step, min) se pasan por el campo
const obtenerCampos = () => CAMPOS;
const aValores = (fila) => ({
  origen: fila.origen,
  destino: fila.destino,
  distanciaKm: fila.distanciaKm,
  duracionMinutos: fila.duracionMinutos,
  precioBase: fila.precioBase,
  terminalIds: fila.terminalIds,
});
const describirFila = (fila) => `la ruta ${fila.origen} → ${fila.destino}`;

export default function PaginaRutas() {
  return (
    <PaginaCrud
      titulo="Rutas"
      encabezado="Gestión de rutas"
      servicio={rutaServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Ruta"
      textoAgregar="Agregar Ruta"
      mensajeVacio="No hay rutas registradas"
    />
  );
}
