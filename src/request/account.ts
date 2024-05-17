import { instance } from '@/plugins'
import type {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@/types'

export const login = (data: LoginRequest) => {
  return instance({
    url: '/login',
    method: 'POST',
    data,
  })
}

export const register = (data: RegisterRequest) => {
  return instance({
    url: '/register',
    method: 'POST',
    data,
  })
}

export const verifyRegisterCode = (code: string) => {
  return instance({
    url: '/verifyRegisterCode',
    method: 'GET',
    params: {
      code,
    },
  })
}

export const resetPasswordCode = (email: string) => {
  return instance({
    url: '/resetPasswordCode',
    method: 'GET',
    params: {
      email,
    },
  })
}

export const innerResetPasswordCode = () => {
  return instance({
    url: '/user/resetPasswordCode',
    method: 'GET',
  })
}

export const checkoutResetPasswordCode = (email: string, code: string) => {
  return instance({
    url: '/checkoutResetPasswordCode',
    method: 'GET',
    params: {
      email,
      code,
    },
  })
}

export const resetPassword = (data: ResetPasswordRequest) => {
  return instance({
    url: '/resetPassword',
    method: 'POST',
    data,
  })
}

export const updateUserAvatar = (data: FormData) => {
  return instance({
    url: '/user/updateUserAvatar',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  })
}
