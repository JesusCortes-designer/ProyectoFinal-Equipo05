// convierte cualquier error de axios en un objeto facil de mostrar en pantalla
export function interpretarError(error) {
  if (error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') {
    return { cancelado: true, estado: 0, mensaje: '', campos: {}, esErrorRed: false };
  }

  // sin respuesta del servidor: se cayo la red o el backend
  if (!error?.response) {
    return {
      cancelado: false,
      estado: 0,
      esErrorRed: true,
      mensaje: 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
      campos: {},
    };
  }

  const datos = error.response.data || {};
  return {
    cancelado: false,
    estado: error.response.status,
    esErrorRed: false,
    mensaje: datos.mensaje || 'Ocurrió un error inesperado, intenta más tarde',
    // el backend regresa los errores por campo en "campos" (422)
    campos: datos.campos || {},
  };
}
