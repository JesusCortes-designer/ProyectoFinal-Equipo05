import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// en desarrollo las peticiones a /api se redirigen al backend (asi no hay problemas de CORS)
export default defineConfig(({ mode }) => {
  const entorno = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: entorno.VITE_PROXY_DESTINO || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  };
});
