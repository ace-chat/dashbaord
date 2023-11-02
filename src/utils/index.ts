export * from './format.ts'

export const pxToVw = (n: number) => {
  return `${Number((n / 1728) * 100).toFixed(2)}vw`
}