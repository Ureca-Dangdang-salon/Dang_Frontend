import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
  },
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@', replacement: '/src' },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://3.36.131.224',
        changeOrigin: true,
      },
    },
  },
});
