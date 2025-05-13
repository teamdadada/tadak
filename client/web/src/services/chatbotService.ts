import { HistoryResponse, MessageRequest, MessageResponse } from '@/types/chatbot'
import { CHATBOT_END_POINT } from './endPoints'
import http from './http-common'

export const sendMessage = async (request: MessageRequest) => {
  const response = await http.post<MessageResponse>(CHATBOT_END_POINT.SEND_MESSAGE, request)
  console.log(response.data)
  return response.data
}

export const getChatHistory = async (userId: string) => {
  const response = await http.get<HistoryResponse>(
    CHATBOT_END_POINT.GET_HISTORY(userId),
  )
  console.log(response.data)
  return response.data
}
