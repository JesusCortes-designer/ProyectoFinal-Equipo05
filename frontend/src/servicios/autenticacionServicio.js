import clienteApi from '../api/clienteApi';

export const iniciarSesion = (correo, contrasena) =>
  clienteApi.post('/auth/login', { correo, contrasena }).then((r) => r.data);

export const registrar = (datos) => clienteApi.post('/auth/registro', datos).then((r) => r.data);

// el logout invalida el token en el backend (el header Authorization lo pone el interceptor)
export const cerrarSesion = () => clienteApi.post('/auth/logout').then((r) => r.data);

export const recuperarContrasena = (correo) =>
  clienteApi.post('/auth/recuperar', { correo }).then((r) => r.data);

export const restablecerContrasena = (token, nuevaContrasena) =>
  clienteApi.post('/auth/restablecer', { token, nuevaContrasena }).then((r) => r.data);
