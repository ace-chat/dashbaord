import { Time } from '@/types/common.ts'

export type AnalyticsHistoryChildren = {
  id: number
  user_id: number
  type: number
  title: string
  business_desc: string
  product_desc: string
  data_desc: string
  service_id: number
  content: string
} & Time

export type AnalyticsHistory = {
  time: string
  children: Array<AnalyticsHistoryChildren>
}

export type DownloadFile = {
  id?: number
  name: string
  download_url: string
}

export type DeepAnalyticsToolStatus = {
  id: number
  status: number
}

export type DeepAnalyticsTool = {
  key: number
  username: string
  business_desc: string
  upload_files: DownloadFile
  bot_upload_files: DownloadFile
  status: DeepAnalyticsToolStatus
  analytics_time: Array<string>
  info: DeepAnalyticsToolInfo
}

export type DeepAnalyticsToolInfo = {
  business_desc: string
  data_desc: string
  product_desc: string
  service_name: string
}
