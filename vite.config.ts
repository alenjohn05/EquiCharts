import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    cssTarget: 'chrome61',
    sourcemap: true,
    rollupOptions: {
      external: ['equicharts'],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') {
            return 'equicharts-pro.css'
          }
        },
        globals: {
          "equicharts": 'equicharts'
        },
      },
    },
    lib: {
      entry: './src/index.ts',
      name: 'equichartspro',
      fileName: (format) => {
        if (format === 'es') {
          return 'equicharts-pro.js'
        }
        if (format === 'umd') {
          return 'equicharts-pro.umd.js'
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: true
  }
})
