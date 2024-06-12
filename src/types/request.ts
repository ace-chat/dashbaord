import { QuestionAndAnswer, SalesAndPitches } from '@/types/businessChat.ts'

export type CreateVoice = {
  text: string
}

export type SaveVoice = {
  name: string
  text: string
  content: string
}

export type AskChatBot = {
  content: string
  id: string
}

export type ChangePlatform = {
  id: number
  status: boolean
}

export type ChangePhoneNumber = {
  id: number
  phone: string
  verifyCode: string
}

export type ChangeStatus = {
  id: number
  status: number
}

export type ChangeQuestionAnswer = {
  id: number
  qa: Array<QuestionAndAnswer>
}

export type ChangeSalesPitches = {
  id: number
  sales_pitches: Array<SalesAndPitches>
}

export type ChangeUploadFiles = {
  id: number
  urls: Array<string>
}

export type SendVerifyCode = {
  type: 'email' | 'phone'
  target: '' | string
}

export type ChangeDeepBotUploadFiles = {
  id: number
  filename: string
}
