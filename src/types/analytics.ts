import { Time } from "@/types/common.ts"

export type AnalyticsHistoryChildren = {
  id: number;
  user_id: number;
  type: number;
  title: string;
  business_desc: string;
  product_desc: string;
  data_desc: string;
  service_id: number;
  content: string;
} & Time

export type AnalyticsHistory = {
  time: string;
  children: Array<AnalyticsHistoryChildren>;
};

