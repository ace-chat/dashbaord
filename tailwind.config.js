const spacings = [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 27, 28, 29, 30, 34, 35, 36, 39, 40, 42, 44, 48, 55, 60, 63, 65, 69, 70, 72, 76, 78, 90, 100, 112, 120, 136, 140, 144, 147, 161, 166, 167, 200, 210, 228, 240, 251, 252, 260, 273, 289, 294, 300, 306, 331, 336, 358, 368, 384, 390, 400, 406, 408, 430, 432, 441, 460, 462, 573, 600, 606, 648, 650, 680, 686, 682, 720, 748, 750, 767, 796, 808, 809, 821, 870, 900, 923, 930, 971, 1081, 1110, 1372, 1389, 5000];
const fontSizes = [6, 10, 12, 13, 14, 16, 18, 20, 21, 22, 24, 28]
const borderRadius = [4, 6, 8, 9, 10, 12, 20, 24, 40]
const lineHeight = [16, 28]

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
