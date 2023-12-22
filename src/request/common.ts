import { instance } from "@/plugins";
import { CreateVoice } from "@/types"

export const getAllRegions = () => {
  return instance({
    url: "/common/regions",
    method: "GET"
  });
}

export const createVoice = (voice: CreateVoice) => {
  return instance({
    url: "/common/createVoice",
    method: "POST",
    data: voice
  });
}

export const getAllVoices = () => {
  return instance({
    url: "/common/voices",
    method: "GET"
  })
}

export const deleteVoice = (id: number) => {
  return instance({
    url: "/common/voices",
    method: "DELETE",
    params: {
      id
    }
  })
}

export const getAllPlatform = (type: number) => {
  return instance({
    url: "/common/platforms",
    method: "GET",
    params: {
      type: type,
    }
  })
}

export const getAllTone = (type: number) => {
  return instance({
    url: "/common/tones",
    method: "GET",
    params: {
      type: type,
    }
  })
}

export const getAllLanguage = () => {
  return instance({
    url: "/common/languages",
    method: "GET"
  })
}

export const getAllGender = () => {
  return instance({
    url: "/common/genders",
    method: "GET"
  })
}

export const getAllType = () => {
  return instance({
    url: "/common/types",
    method: "GET"
  })
}

export const uploadFile = (data: FormData) => {
  return instance({
    url: "/common/upload",
    method: "GET",
    data
  })
}

export const getAllService = () => {
  return instance({
    url: "/common/service",
    method: "GET"
  })
}