import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Frontend/blogWebsite/dist/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', 
    emptyOutDir: true 
  }
})