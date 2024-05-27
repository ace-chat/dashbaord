import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssPxToViewport from "postcss-px-to-viewport-8-plugin";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    open: true,
    host: true,
    proxy: {
      "/api": {
        target: "https://t.aceai.digital",
        changeOrigin: true,
      }
    }
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
        postcssPxToViewport({
          unitToConvert: 'px', // need deal with px to vw.
            viewportWidth: 1728, // design width
            exclude: [/node_modules/], // not change folder
            viewportHeight: 1115, // (Number) The height of the design.
            unitPrecision: 5, // keep decimal
            propList: ['*'], // which props can change to vw
            viewportUnit: 'vw', // what unit to use
            fontViewportUnit: 'vw', // font size to use
            selectorBlackList: [], // not to change px to vw
            minPixelValue: 1, // min pixel value to change
            mediaQuery: false, // media query whether change or not change
        }),
      ]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if(id.includes('node_modules')){
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]'
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
