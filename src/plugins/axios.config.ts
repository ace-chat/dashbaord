import axios from 'axios'
import type { Method } from 'axios'
import { message } from 'antd'
import i18n from 'i18next'
import store from '@/store'
import type { Response } from '@/types'

const http = axios.create({
  baseURL: '',
  timeout: 10000,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${  store.getState().token.token}`,
  },
})

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (!window.navigator.onLine) {
      message.error(i18n.t('Please check network connection')).then()
    }

    return Promise.reject(err)
  }
)

export const instance = ({
  url,
  method,
  params,
  data,
}: {
  url: string
  method: Method | string
  params?: Record<string, any>
  data?: Record<string, any>
}) => new Promise<Response>((resolve, reject) => {
    http({
      url,
      method,
      params,
      data,
    })
      .then((res) => {
        resolve(res as any)
      })
      .catch((err) => {
        reject(err)
      })
  })
