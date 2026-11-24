const API_URL = 'https://dummyjson.com/auth/login';

export const loginUser = async (username, password) => {
  let response;

  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });
  } catch {

      throw new Error('No se pudo conectar con el servidor. Intenta de nuevo.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Usuario o contraseña incorrectos.');
    }
    throw new Error('Ocurrió un error al iniciar sesión. Intenta más tarde.');
  }

  return data;
};