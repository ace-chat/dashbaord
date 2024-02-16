import { message } from 'antd'
import copy from 'copy-to-clipboard'

export * from './format.ts'

export const pxToVw = (n: number) => {
  return `${Number((n / 1728) * 100).toFixed(2)}vw`
}

// export const pxToVw = (n: number) => {
//   const baseWidth = 1440; 
//   const vwUnit = (n / baseWidth) * 100;
//   const minFontSizePx = 12; 
//   const minFontSizeVw = (minFontSizePx / baseWidth) * 100;
//   return `${Math.max(vwUnit, minFontSizeVw).toFixed(2)}vw`;
// };

export const copied = (text: string) => {
  copy(text)
  message.success("Copied successfully").then()
}
