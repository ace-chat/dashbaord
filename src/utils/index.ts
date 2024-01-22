import { message } from 'antd'

export * from './format.ts'

export const pxToVw = (n: number) => {
  return `${Number((n / 1728) * 100).toFixed(2)}vw`
}

export const copied = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success("Copied successfully").then()
  }).catch(() => {
    message.error("Copied failed").then()
  })
}