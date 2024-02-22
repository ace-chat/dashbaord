export type Time = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type Language = {
  id: number;
  type: 1 | 2;
  name: string;
  iso: string;
} & Time

export type Region = {
  id: number;
  country: string;
  iso: string;
} & Time

export type Tone = {
  id: number;
  type: 1 | 2;
  name: string;
  value: string;
}

export type Voice = {
  id: number;
  user_id : number;
  name: string;
  text: string;
  content: string;
} & Time

export type Gender = {
  id: number;
  name: string;
  value: string;
} & Time

export type Type = {
  id: number;
  name: string;
  value: string;
} & Time

export type Service = {
  id: number;
  name: string;
  value: string;
} & Time

export type Platform = {
  id: number;
  type: number;
  name: string;
  value: string;
} & Time

export type Option = {
  label: string;
  value: any;
}

export type Dialog = {
  show: boolean;
  title?: string;
  step: number;
}