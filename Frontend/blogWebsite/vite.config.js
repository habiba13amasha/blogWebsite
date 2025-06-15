import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/imgbb': {
        target: 'https://api.imgbb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/imgbb/, '')
      }
    }
  }
})
