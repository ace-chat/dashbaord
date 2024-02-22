import { instance } from "@/plugins";
import {CreateVoice, SaveVoice, SendVerifyCode} from "@/types"

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

export const saveVoice = (voice: SaveVoice) => {
  return instance({
    url: "/common/saveVoice",
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
    url: "/common/deleteVoice",
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

export const getAllPhoneCode = () => {
  return instance({
    url: '/common/codes',
    method: "GET"
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

export const upload = (data: FormData) => {
  return instance({
    url: "/common/upload",
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data
  })
}

export const getAllService = () => {
  return instance({
    url: "/common/service",
    method: "GET"
  })
}

export const getUserInfo = () => {
  return instance({
    url: "/user/getUserInfo",
    method: "GET"
  })
}


export const updateUserInfo = (data: any) => {
  return instance({
    url: "/user/updateUserInfo",
    method: "POST",
    data: data
  })
}

export const updatePassword = (data: any) => {
  return instance({
    url: "/user/updatePassword",
    method: "POST",
    data: data
  })
}

export const getOptions = () => {
  return instance({
    url: "/common/options",
    method: "GET"
  })
}

export const sendVerifyCode = (data: SendVerifyCode) => {
  return instance({
    url: "/common/sendVerifyCode",
    method: "POST",
    data
  })
}
