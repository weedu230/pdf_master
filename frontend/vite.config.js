import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    minify: 'esbuild',
    target: 'esnext',
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor code splitting
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            if (id.includes('axios')) {
              return 'vendor-http'
            }
            return 'vendor'
          }
          
          // Route-based code splitting
          if (id.includes('pages/')) {
            const match = id.match(/pages\/(\w+)/)
            if (match) {
              return `page-${match[1].toLowerCase()}`
            }
          }
          
          // Component chunking
          if (id.includes('components/')) {
            return 'components'
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: (chunkInfo) => {
          // Prioritize critical chunks
          if (chunkInfo.name.includes('vendor-react') || chunkInfo.name.includes('vendor-router')) {
            return 'assets/[name]-[hash].js'
          }
          return 'assets/chunks/[name]-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/styles/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      }
    },
    chunkSizeWarningLimit: 600,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})
