import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/posts': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/imgbb': {
        target: 'https://api.imgbb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/imgbb/, '')
      }
    }
  }
})