const spacings = [4, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 28, 29, 30, 34, 36, 39, 40, 42, 48, 55, 60, 70, 76, 78, 90, 100, 112, 120, 136, 140, 147, 161, 167, 228, 240, 251, 260, 273, 289, 300, 306, 336, 358, 368, 390, 406, 408, 441, 600, 606, 650, 680, 682, 720, 748, 767, 796, 808, 821, 870, 900, 923, 930, 1081, 1110, 1389];
const fontSizes = [10, 12, 14, 16, 18, 20, 24]
const borderRadius = [6, 8, 10, 12, 20, 24, 40]
const lineHeight = [28]

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        px: '1px',
        ...spacings.reduce((pre, cur) => {
          pre[cur] = cur + 'px'
          return pre
        }, {}),
      },
      fontSize: {
        ...fontSizes.reduce((pre, cur) => {
          pre[cur] = [cur + 'px', 1]
          return pre
        }, {}),
      },
      borderRadius: {
        ...borderRadius.reduce((pre, cur) => {
          pre[cur] = cur + 'px'
          return pre
        }, {}),
      },
      lineHeight: {
        ...lineHeight.reduce((pre, cur) => {
          pre[cur] = cur + 'px'
          return pre
        }, {}),
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
}
