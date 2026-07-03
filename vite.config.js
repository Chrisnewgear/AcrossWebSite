import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Local PHP endpoints: run `php -S localhost:8000 -t public` in another terminal.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
