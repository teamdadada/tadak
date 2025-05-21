export interface MessageRequest {
  query: string
  user_id: string
}

export interface Recommendation {
  name: string
  price: number
  thumbnail: string
  url: string
}

export interface MessageResponse {
  response: string
  recommendations: Recommendation[]
}

export interface ChatHistory {
  type: 'human' | 'ai'
  content: string
  recommendations?: Recommendation[]
}

export type HistoryResponse = ChatHistory[]
