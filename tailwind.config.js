const spacings = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 34, 36, 40, 42, 55, 60, 76, 78, 90, 100, 120, 136, 140, 147, 240, 251, 289, 300, 358, 390, 406, 408, 600, 606, 682, 720, 821, 1110];
const fontSizes = [10, 12, 14, 16, 18, 20, 24]
const borderRadius = [8, 10, 24, 40]

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
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
}
