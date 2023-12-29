import { instance } from "@/plugins"

export const generatorAnalytics = (filename: string) => {
  return instance({
    url: "/analytics/simple/generator",
    method: "POST",
    data: {
      filename: filename
    }
  })
}

export const getAnalyticsHistory = () => {
  return instance({
    url: "/analytics/simple/histories",
    method: "GET",
  })
}

export const getAnalyticsById = (id: number) => {
  return instance({
    url: "/analytics/simple/getHistoryById",
    method: "GET",
    params: {
      id
    }
  })
}

export const generatorDeepAnalytics = (data: any) => {
  return instance({
    url: "/analytics/deep/generator",
    method: "POST",
    data: data
  })
}

export const getDeepAnalyticsHistory = () => {
  return instance({
    url: "/analytics/deep/histories",
    method: "GET",
  })
}

export const getDeepAnalyticsById = (id: number) => {
  return instance({
    url: "/analytics/deep/getHistoryById",
    method: "GET",
    params: {
      id
    }
  })
}