import type { Key } from "react";

export type ChatHistoryChildren = {
  id: number;
  user_id: number;
  title: string;
  chat_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type ChatHistory = {
  time: string;
  children: Array<ChatHistoryChildren>;
}

export type ChatMessage = {
  key: Key,
  type: string;
  content: string;
  time: string;
}