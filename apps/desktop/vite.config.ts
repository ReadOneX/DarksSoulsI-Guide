import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    strictPort: true
  },
  envPrefix: ['VITE_', 'TAURI_']
});
