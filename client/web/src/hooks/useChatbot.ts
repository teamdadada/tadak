import { getChatHistory, sendMessage } from '@/services/chatbotService'
import { HistoryResponse } from '@/types/chatbot'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useSendMessage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (response) => {
      console.log(response)
    },
    onError: () => {
      toast.error('메시지 전송에 실패했습니다.')
    },
  })

  return { sendMessage: mutateAsync, isPending }
}

export const useGetChatHistory = () => {
  return useQuery<HistoryResponse>({
    queryKey: ['chat'],
    queryFn: getChatHistory,
  })
}
