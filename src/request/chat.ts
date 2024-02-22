import { instance } from "@/plugins"
import {
  AskChatBot,
  BusinessChatRequest,
  ChangePhoneNumber,
  ChangePlatform,
  ChangeQuestionAnswer,
  ChangeSalesPitches, ChangeUploadFiles
} from "@/types"

export const getChatHistory = (id: string) => {
  return instance({
    url: "/chat/bot/getChatHistory",
    method: "GET",
    params: {
      id
    }
  })
}

export const getChatList = () => {
  return instance({
    url: "/chat/bot/getChatList",
    method: "GET"
  })
}

export const createChatBot = () => {
  return instance({
    url: "/chat/bot/create",
    method: "POST"
  })
}

export const askChatBot = (data: AskChatBot) => {
  return instance({
    url: "/chat/bot/ask",
    method: "POST",
    data
  })
}

export const createBusinessChatBot = (data: BusinessChatRequest) => {
  return instance({
    url: "/chat/business/create",
    method: "POST",
    data
  })
}

export const changePlatform = (data: ChangePlatform) => {
  return instance({
    url: "/chat/business/changePlatform",
    method: "PUT",
    data
  })
}

export const changePhoneNumber = (data: ChangePhoneNumber) => {
  return instance({
    url: '/chat/business/changePhoneNumber',
    method: 'PUT',
    data
  })
}

export const changeQuestionAnswer = (data: ChangeQuestionAnswer) => {
  return instance({
    url: '/chat/business/manageQA',
    method: 'PUT',
    data
  })
}

export const changeSalesPitches = (data: ChangeSalesPitches) => {
  return instance({
    url: '/chat/business/manageSalesAndPitches',
    method: 'PUT',
    data
  })
}

export const changeUploadFiles = (data: ChangeUploadFiles) => {
  return instance({
    url: '/chat/business/manageUploadFiles',
    method: 'PUT',
    data
  })
}

export const deleteChatBot = (data: { id: number }) => {
  return instance({
    url: '/chat/business/delete',
    method: 'DELETE',
    data
  })
}

export const getBusinessChatBot = () => {
  return instance({
    url: "/chat/business/getBusinessChatBot",
    method: "GET"
  })
}