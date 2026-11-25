import clienteApi from '../api/clienteApi';
import { crearServicioCrud } from './fabricaServicio';

const usuarioServicio = {
  ...crearServicioCrud('/usuarios'),

  // datos del usuario que tiene la sesion abierta
  perfil: () => clienteApi.get('/usuarios/perfil').then((r) => r.data),

  // cambio de contraseña desde el perfil (el usuario manda la actual y la nueva)
  cambiarContrasena: (contrasenaActual, nuevaContrasena) =>
    clienteApi
      .put('/usuarios/perfil/contrasena', { contrasenaActual, nuevaContrasena })
      .then((r) => r.data),
};

export default usuarioServicio;
