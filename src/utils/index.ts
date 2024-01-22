import { message } from 'antd'
import copy from 'copy-to-clipboard'

export * from './format.ts'

export const pxToVw = (n: number) => {
  return `${Number((n / 1728) * 100).toFixed(2)}vw`
}

export const copied = (text: string) => {
  copy(text)
  message.success("Copied successfully").then()
}