import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ⚠️ IMPORTANT: Change this to your actual repo name, e.g., '/hunter-os/'
  base: '/0xHunterOS/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})