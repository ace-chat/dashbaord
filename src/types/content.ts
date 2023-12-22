export type ContentHistoryChildren = {
  id: number;
  type: number;
  ads_id: number;
  user_id: number;
  text: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ContentHistory = {
  time: string;
  children: Array<ContentHistoryChildren>;
}

type Details = {
  brand_name?: boolean;
  brand_desc?: boolean;
  service_name?: boolean;
  service_desc?: boolean;
  text?: boolean;
}

type Style = {
  tones?: boolean;
  voice?: boolean;
  type?: boolean;
  keyword?: boolean;
}

type Audience = {
  region?: boolean;
  gender?: boolean;
  age?: boolean;
}

export type Optional = {
  platform?: boolean;
  text?: boolean;
  details?: Details;
  style?: Style;
  audience?: Audience;
  word_count?: boolean;
  other_detail?: boolean;
  topic?: boolean;
}

export type Url = {
  generator: string;
  history: string;
  content: string;
}

export type Prop = {
  title: string;
  flow?: string;
  subTitle: string;
  tag: string;
  optional?: Optional;
  url: Url;
}