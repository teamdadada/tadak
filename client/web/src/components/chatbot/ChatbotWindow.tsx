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

  const [messages, setMessages] = useState<HistoryResponse>([
    {
      type: 'ai',
      content: `${userName}님 안녕하덕! 🐥\n키보드에 대해 궁금한 점을 물어보면 타덕이가 대답해줄거덕!`,
    },
  ])

  // 채팅 기록이 있으면 메시지 업데이트
  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory)
    }
  }, [chatHistory])

  // 비로그인 유저에게 출력되는 메시지
  useEffect(() => {
    if (!isAuthenticated) {
      setMessages([
        {
          type: 'ai',
          content: '안녕하덕! 🐥',
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
    }
  }, [isAuthenticated])

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return

    // 유저 메시지 추가
    setMessages((prev) => [...prev, { type: 'human', content: input }])
    const response = await sendMessage({
      query: input,
      user_id: String(userId),
    })

    // 응답 메시지 추가
    setMessages((prev) => [...prev, { type: 'ai', content: response.response }])
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
          <ChatbotMessages messages={messages} />
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
          <ChatbotInput onSend={handleSendMessage} disabled={isPending} />
        )}
      </div>
    </motion.div>
  )
}

export default ChatbotWindow
