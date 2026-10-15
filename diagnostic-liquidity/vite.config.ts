import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/diagnostic-liquidity/',
    server: {
      port: 5174,
      strictPort: true
    },
    preview: {
      port: 5174,
      strictPort: true
    }
  };
});
