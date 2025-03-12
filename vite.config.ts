import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})



// vue.config.ts
module.exports = {
  publicPath: './',
}
// vite.config.ts
base: './'