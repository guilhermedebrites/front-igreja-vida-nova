import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['date-fns'],
    esbuildOptions: {
      target: 'esnext', // Garante que as libs sejam transpiladas corretamente
    },
  },
  build: {
    outDir: 'dist', // Saída esperada
    chunkSizeWarningLimit: 1000, // Aumenta limite de aviso para chunks grandes
    commonjsOptions: {
      transformMixedEsModules: true, // Evita erro com libs CJS misturadas com ESM
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Quebra de chunks para evitar um único bundle muito grande
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor_react'
            if (id.includes('date-fns')) return 'vendor_datefns'
            return 'vendor'
          }
        },
      },
    },
  },
})
