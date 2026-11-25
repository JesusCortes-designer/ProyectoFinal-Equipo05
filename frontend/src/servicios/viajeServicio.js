import clienteApi from '../api/clienteApi';
import { crearServicioCrud } from './fabricaServicio';

const viajeServicio = {
  ...crearServicioCrud('/viajes'),

  // numeros de asiento que ya estan tomados en un viaje
  asientosOcupados: (id) => clienteApi.get(`/viajes/${id}/asientos-ocupados`).then((r) => r.data),
};

export default viajeServicio;
