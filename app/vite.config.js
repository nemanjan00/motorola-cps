import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'motorola-cps': resolve(__dirname, '../lib/index.js'),
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      external: ['serialport', 'node:fs/promises'],
      output: {
        manualChunks: {
          'cps-data': [
            resolve(__dirname, '../lib/data/help.js'),
            resolve(__dirname, '../lib/data/string-table.js'),
            resolve(__dirname, '../lib/data/field-defs.js'),
            resolve(__dirname, '../lib/data/field-labels.js'),
          ],
        },
      },
    },
  },
});
