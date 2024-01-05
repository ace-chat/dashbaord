import axios from 'axios'
import type { Method } from 'axios'
import { message } from 'antd'
import i18n from 'i18next'
import store from '@/store'
import type { Response } from '@/types'

const http = axios.create({
  baseURL: import.meta.env.DEV ? "http://127.0.0.1:8080/api/v1" : "/api/v1",
  timeout: 200000,
  withCredentials: false,
})

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (!window.navigator.onLine) {
      message.error(i18n.t('Please check network connection')).then();
    }

    if(err.response.data.code === 20005){
      message.error(i18n.t(err.response.data.message)).then();
      window.location.href = "/login";
    }

    return Promise.reject(err)
  }
)

export const instance = ({
  url,
  method,
  headers,
  params,
  data,
}: {
  url: string
  method: Method | string
  headers?: Record<string, any>
  params?: Record<string, any>
  data?: Record<string, any>
}) => new Promise<Response>((resolve, reject) => {
    http({
      url,
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${store.getState().token.token}`,
      },
      params,
      data,
    })
      .then((res) => {
        resolve(res.data as any)
      })
      .catch((err) => {
        reject(err)
      })
  })
