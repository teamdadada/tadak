export interface MessageRequest {
  userId: string
  query: string
}

export interface MessageResponse {
  response: string
}

export interface ChatHistory {
  content: string
  type: 'human' | 'ai'
}

export type HistoryResponse = ChatHistory[]
