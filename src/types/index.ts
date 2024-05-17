export * from './HomePage.ts'
export * from './response.ts'
export * from './request.ts'
export * from './common.ts'
export * from './content.ts'
export * from './chat.ts'
export * from './analytics.ts'
export * from './businessChat.ts'

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  plan: number
}

export type ResetPasswordRequest = {
  email: string
  code: string
  password: string
}
