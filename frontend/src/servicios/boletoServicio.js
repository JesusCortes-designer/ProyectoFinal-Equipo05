import clienteApi from '../api/clienteApi';
import { limpiarParametros } from './fabricaServicio';

const boletoServicio = {
  // administrador y taquillero: todos los boletos (filtros buscar y estado)
  listar: (parametros, senal) =>
    clienteApi.get('/boletos', { params: limpiarParametros(parametros), signal: senal }).then((r) => r.data),

  // venta en ventanilla (taquillero)
  vender: (viajeId, numeroAsiento) => clienteApi.post('/boletos', { viajeId, numeroAsiento }).then((r) => r.data),

  cancelar: (id) => clienteApi.put(`/boletos/${id}/cancelar`).then((r) => r.data),
};

export default boletoServicio;
