import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/barter-bridge/',
    server: {
      port: 5173,
      strictPort: true
    },
    preview: {
      port: 5173,
      strictPort: true
    }
  };
});
