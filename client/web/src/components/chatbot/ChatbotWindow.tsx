import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatbotHeader from './ChatbotHeader'
import ChatbotMessages from './ChatbotMessages'
import ChatbotInput from './ChatbotInput'
import { useGetChatHistory, useSendMessage } from '@/hooks/useChatbot'
import { Link } from 'react-router-dom'
import { HistoryResponse } from '@/types/chatbot'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import DotWave from '../common/DotWave'

const ChatbotWindow = () => {
  const getIsAuthenticated = useAuthStore((state) => state.getIsAuthenticated)
  const isAuthenticated = getIsAuthenticated()

  const getUserUuid = useUserStore((state) => state.getUserUuid)
  const userId = getUserUuid()

  const getUserName = useUserStore((state) => state.getUserName)
  const userName = getUserName()

  const { sendMessage, isPending } = useSendMessage()
  const { data: chatHistory, isLoading } = useGetChatHistory()

  // 초기 메시지 상태
  const [messages, setMessages] = useState<HistoryResponse>([])
  // 메시지 로딩 상태 추가
  const [isMessageLoading, setIsMessageLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      // 비로그인 유저 메시지
      setMessages([
        {
          type: 'ai',
          content: '안녕하덕! 나는 키보드 덕후 타덕이덕🐥',
        },
        {
          type: 'ai',
          content: '이 기능은 로그인해야 사용할 수 있덕!',
        },
        {
          type: 'ai',
          content:
            '로그인하면 대화 기록을 저장하고, 맞춤 키보드 추천까지 받을 수 있덕!',
        },
      ])
    } else if (chatHistory && chatHistory.length > 0) {
      // 채팅 기록이 있으면 그대로 사용
      setMessages(chatHistory)
    } else if (!isLoading) {
      // 로그인 상태이고 채팅 기록이 없거나 로딩 완료된 경우 기본 환영 메시지 사용
      setMessages([
        {
          type: 'ai',
          content: `${userName || ''}님 안녕하덕! 🐥\n키보드에 대해 궁금한 점을 물어보면 타덕이가 대답해줄거덕!`,
        },
      ])
    }
  }, [isAuthenticated, chatHistory, isLoading, userName])

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return

    // 유저 메시지 추가
    setMessages((prev) => [...prev, { type: 'human', content: input }])

    // 메시지 로딩 상태 활성화
    setIsMessageLoading(true)

    try {
      const response = await sendMessage({
        query: input,
        user_id: String(userId),
      })

      // 응답 메시지 추가
      setMessages((prev) => [
        ...prev,
        { type: 'ai', content: response.response },
      ])
    } catch (error) {
      console.error('메시지 전송 오류:', error)
      // 오류 발생 시 오류 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          content: '앗! 메시지 전송 중 오류가 발생했덕! 다시 시도해주라덕!',
        },
      ])
    } finally {
      // 로딩 상태 해제
      setIsMessageLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute bottom-20 right-4 w-[400px] md:w-[500px] lg:w-[600px] h-[500px] overflow-visible z-50"
    >
      <div
        className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)',
        }}
      >
        <ChatbotHeader />
        {isLoading && isAuthenticated ? (
          <div className="flex flex-1 items-center justify-center text-9xl text-tadak-gray">
            <DotWave />
          </div>
        ) : (
          <ChatbotMessages messages={messages} isLoading={isMessageLoading} />
        )}

        {!isAuthenticated ? (
          // 비로그인 유저
          <Link
            className="border-t p-5 bg-tadak-secondary text-center text-tadak-white font-semibold text-sm"
            to="/account/login"
          >
            로그인 하러 가기
          </Link>
        ) : (
          // 로그인 유저
          <ChatbotInput
            onSend={handleSendMessage}
            disabled={isPending || isMessageLoading}
          />
        )}
      </div>
    </motion.div>
  )
}

export default ChatbotWindow
