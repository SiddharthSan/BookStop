// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/cart': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
      '/book': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
});
