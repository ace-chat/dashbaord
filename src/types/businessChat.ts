import type { Key } from 'react'

export type QuestionAndAnswer = {
  question: string
  answer: string
}

export type SalesAndPitches = {
  topic: string
  input: string
}

export type BusinessChatRequest = {
  company_name: string
  links: Array<string>
  company_introduction: string
  platform: Array<number> | number
  phone_number: string
  tone: number
  qa: Array<QuestionAndAnswer>
  sales_pitches: Array<SalesAndPitches>
  files: Array<string>
  created_time?: number
  ended_time?: number
}

export type BusinessChat = BusinessChatRequest & {
  id: number
}

export type SP = SalesAndPitches & {
  key: Key
}

export type SalesPitchProps = {
  sps: Array<SP>
  onChange: (text: string, key: Key, type: 'topic' | 'value') => void
  onAdd: () => void
  onRemove: (key: Key) => void
  onConform: () => void
}

export type QA = QuestionAndAnswer & {
  key: Key
}

export type QuestionAnswerProps = {
  qas: Array<QA>
  onChange: (text: string, key: Key, type: 'question' | 'answer') => void
  onAdd: () => void
  onRemove: (key: Key) => void
  onConform: () => void
}

export type File = {
  name: string
  url: string
}

export type DownloadFile = {
  id?: number
  name: string
  download_url: string
}

export type BusinessMerchantChatBot = {
  key: number
  company_name: string
  // links: Array<string>
  company_introduction: string
  // platform: Array<number> | number
  // phone_number: string
  // tone: number
  qa: Array<QuestionAndAnswer>
  sales_pitches: Array<SalesAndPitches>
  files: Array<DownloadFile>
  // created_time?: number
  // ended_time?: number
  sale_time: Array<string>
  // status: string
  status: BusinessMerchantChatBotStatus
  info: BusinessMerchantChatBotInformation
}

export type BusinessMerchantChatBotStatus = {
  id: number
  status: number
}

export type BusinessMerchantChatBotInformation = {
  company_name: string
  company_introduction: string
  platform: BusinessMerchantChatBotInformationPlatform[]
  tone: number
  tone_name: string
  phone_number: string
  links: Array<string>
}

export type BusinessMerchantChatBotInformationPlatform = {
  id: number
  name: string
  status: boolean
}
