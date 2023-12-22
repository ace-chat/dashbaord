import { instance } from "@/plugins"
import type { AskChatBot } from "@/types"

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