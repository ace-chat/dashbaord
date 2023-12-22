import { instance } from "@/plugins";

export const generator = (url: string, data: Record<string, any>) => {
  return instance({
    url: url,
    method: "POST",
    data
  })
}

export const getHistory = (url: string) => {
  return instance({
    url: url,
    method: "GET"
  })
}

export const getDetailById = (url: string, id: number) => {
  return instance({
    url: url,
    method: "GET",
    params: {
      id
    }
  })
}