import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@logo-small': './src/assets/logo-small.png',
      '@logo-large': './src/assets/logo-large.png',
    },
  },
})
