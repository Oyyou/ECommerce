import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'api': path.resolve(__dirname, 'src/api'),
      'components': path.resolve(__dirname, 'src/components'),
      'providers': path.resolve(__dirname, 'src/providers'),
      'routes': path.resolve(__dirname, 'src/routes'),
      'state': path.resolve(__dirname, 'src/state'),
      'utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
