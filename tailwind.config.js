const spacings = [12, 24, 28, 30, 36, 42, 60, 90, 100, 136, 140, 240, 358, 390, 406, 408, 720, 1110];
const fontSizes = [16, 20]
const borderRadius = [10, 24, 40]

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
