export type CreateVoice = {
  text: string;
}

export type SaveVoice = {
  name: string;
  text: string;
  content: string;
}

export type AskChatBot = {
  content: string;
  id: string;
}