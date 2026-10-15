import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/horizon-scrape/',
    server: {
      port: 5175,
      strictPort: true
    },
    preview: {
      port: 5175,
      strictPort: true
    }
  };
});
