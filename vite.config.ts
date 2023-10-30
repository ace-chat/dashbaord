import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss(),
      ]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id){
          if (id.includes('tailwindcss')){
            return 'tailwindcss'
          }else{
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[name]',
    })
  ],
})
