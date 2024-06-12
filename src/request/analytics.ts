import { instance } from '@/plugins'
import { ChangeDeepBotUploadFiles, ChangeStatus } from '@/types'

export const generatorAnalytics = (filename: string) => {
  return instance({
    url: '/analytics/simple/generator',
    method: 'POST',
    data: {
      filename: filename,
    },
  })
}

export const getAnalyticsHistory = () => {
  return instance({
    url: '/analytics/simple/histories',
    method: 'GET',
  })
}

export const getAnalyticsById = (id: number) => {
  return instance({
    url: '/analytics/simple/getHistoryById',
    method: 'GET',
    params: {
      id,
    },
  })
}

export const generatorDeepAnalytics = (data: any) => {
  return instance({
    url: '/analytics/deep/generator',
    method: 'POST',
    data: data,
  })
}

export const getDeepAnalyticsHistory = () => {
  return instance({
    url: '/analytics/deep/histories',
    method: 'GET',
  })
}

export const getDeepAnalyticsById = (id: number) => {
  return instance({
    url: '/analytics/deep/getHistoryById',
    method: 'GET',
    params: {
      id,
    },
  })
}

export const getDeepAnalyticList = () => {
  return instance({
    url: '/analytics/deep/getDeepAnalyticList',
    method: 'GET',
  })
}

export const changeDeepAnalyticsBotUploadFile = (
  data: ChangeDeepBotUploadFiles
) => {
  return instance({
    url: '/analytics/deep/changeBotUploadFile',
    method: 'PUT',
    data,
  })
}

export const changeDeepAnalyticsStatus = (data: ChangeStatus) => {
  return instance({
    url: '/analytics/deep/changeStatus',
    method: 'PUT',
    data,
  })
}
