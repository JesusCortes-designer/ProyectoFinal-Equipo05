import PaginaCrud from '../../componentes/datos/PaginaCrud';
import terminalServicio from '../../servicios/terminalServicio';
import { longitudMaxima, requerido } from '../../utilidades/validaciones';

const COLUMNAS = [
  { titulo: 'ID', clave: 'id' },
  { titulo: 'Nombre', clave: 'nombre' },
  { titulo: 'Ciudad', clave: 'ciudad' },
  { titulo: 'Dirección', clave: 'direccion' },
  { titulo: 'Administrador', clave: 'administradorNombre' },
];

const FILTROS = [{ nombre: 'buscar', tipo: 'busqueda', marcador: 'Buscar terminal...' }];

const CAMPOS = [
  {
    nombre: 'nombre',
    etiqueta: 'Nombre de la terminal',
    marcador: 'Terminal Central Oriente',
    icono: 'ubicacion',
    reglas: [requerido('El nombre es obligatorio'), longitudMaxima(100)],
  },
  {
    nombre: 'ciudad',
    etiqueta: 'Ciudad',
    marcador: 'Ciudad de México',
    reglas: [requerido('La ciudad es obligatoria'), longitudMaxima(80)],
  },
  {
    nombre: 'direccion',
    etiqueta: 'Dirección',
    marcador: 'Calle, número y colonia',
    reglas: [requerido('La dirección es obligatoria'), longitudMaxima(200)],
  },
];

const obtenerCampos = () => CAMPOS;
const aValores = (fila) => ({ nombre: fila.nombre, ciudad: fila.ciudad, direccion: fila.direccion });
const describirFila = (fila) => `la terminal "${fila.nombre}"`;

export default function PaginaTerminales() {
  return (
    <PaginaCrud
      titulo="Terminales"
      encabezado="Gestión de terminales"
      servicio={terminalServicio}
      columnas={COLUMNAS}
      filtros={FILTROS}
      obtenerCampos={obtenerCampos}
      aValores={aValores}
      describirFila={describirFila}
      nombreElemento="Terminal"
      textoAgregar="Agregar Terminal"
      mensajeVacio="No hay terminales registradas"
    />
  );
}
