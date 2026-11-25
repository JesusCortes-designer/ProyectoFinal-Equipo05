import axios from 'axios';

// claves con las que se guarda la sesion en el navegador
export const CLAVE_TOKEN = 'terminal_token';
export const CLAVE_USUARIO = 'terminal_usuario';

// cliente de axios: todas las peticiones salen por aqui
const clienteApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

// agrega el token JWT en el header Authorization de cada peticion
clienteApi.interceptors.request.use((configuracion) => {
  const token = localStorage.getItem(CLAVE_TOKEN);
  if (token) {
    configuracion.headers.Authorization = `Bearer ${token}`;
  }
  return configuracion;
});

// cuando el token vence o es invalido (401) se avisa para cerrar la sesion
let alExpirarSesion = null;
export const registrarAlExpirarSesion = (funcion) => {
  alExpirarSesion = funcion;
};

clienteApi.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const estado = error.response?.status;
    const url = error.config?.url || '';
    if (estado === 401 && !url.startsWith('/auth/') && alExpirarSesion) {
      alExpirarSesion();
    }
    return Promise.reject(error);
  }
);

export default clienteApi;
