import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/todolist-app/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  }
})

