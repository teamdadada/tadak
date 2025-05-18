export interface MessageRequest {
  query: string
  user_id: string
}

export interface MessageResponse {
  response: string
}

export interface ChatHistory {
  type: 'human' | 'ai'
  content: string
}

export type HistoryResponse = ChatHistory[]
