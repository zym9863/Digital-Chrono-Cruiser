import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'three-stdlib': ['three-stdlib'],
          'gsap': ['gsap']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    open: true
  },
  preview: {
    host: true,
    port: 4173,
    open: true
  }
})
