import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5994,
    host: true,
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2000, // Suppress chunk size warnings
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'ui-vendor': ['framer-motion', 'recharts', 'lucide-react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
      onwarn(warning, warn) {
        // Suppress dynamic/static import mixing warnings
        if (warning.message?.includes('dynamically imported') && warning.message?.includes('statically imported')) return;
        // Suppress Node.js module externalization warnings
        if (warning.message?.includes('externalized for browser compatibility')) return;
        // Suppress circular dependency in node_modules
        if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message?.includes('node_modules')) return;
        warn(warning);
      },
    },
  },
  logLevel: 'error', // Only show errors, not warnings/info
})
