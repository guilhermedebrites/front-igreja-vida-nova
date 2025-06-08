import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['date-fns'],
  },
  build: {
    outDir: 'dist', // Garantir saída na pasta esperada
    chunkSizeWarningLimit: 1000, // Aumentar limite de aviso (não resolve o erro, mas remove o warning)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar dependências grandes para evitar chunks únicos gigantes
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
