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
          unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1728, // 设计稿的视口宽度
            exclude: [/node_modules/],
            viewportHeight: 1115, // (Number) The height of the viewport.
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        }),
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
