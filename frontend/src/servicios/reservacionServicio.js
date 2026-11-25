import clienteApi from '../api/clienteApi';
import { limpiarParametros } from './fabricaServicio';

const reservacionServicio = {
  // administrador: todas las reservaciones (filtro por estado)
  listar: (parametros, senal) =>
    clienteApi.get('/reservaciones', { params: limpiarParametros(parametros), signal: senal }).then((r) => r.data),

  // cliente: solo las suyas
  mias: (parametros, senal) =>
    clienteApi.get('/reservaciones/mias', { params: limpiarParametros(parametros), signal: senal }).then((r) => r.data),

  crear: (viajeId, asientos) => clienteApi.post('/reservaciones', { viajeId, asientos }).then((r) => r.data),

  cancelar: (id) => clienteApi.put(`/reservaciones/${id}/cancelar`).then((r) => r.data),
};

export default reservacionServicio;
