import { HistoryResponse } from '@/types/chatbot'
import { useEffect, useRef } from 'react'
import LoadingBubble from './LoadingBubble'
import { AnimatePresence, motion } from 'framer-motion'
import Recommendations from './Recommendations'

interface ChatbotMessagesProps {
  messages: HistoryResponse
  isLoading?: boolean
}

const ChatbotMessages = ({ messages, isLoading }: ChatbotMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div
      className="flex-1 flex flex-col gap-2 p-5 overflow-y-auto"
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => {
            // 추천 항목이 있는지 확인
            const hasRecommendations =
              message.recommendations && message.recommendations.length > 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`flex ${
                  message.type === 'human' ? 'justify-end' : 'justify-start'
                }`}
              >
                {!hasRecommendations ? (
                  <div
                    className={`text-[15px] py-3 px-4 max-w-sm rounded-lg whitespace-pre-wrap
                    ${message.type === 'human' ? 'ml-auto border border-tadak-gray/30 ' : 'mr-auto bg-tadak-light-gray'}`}
                    style={{
                      overflowWrap: 'break-word',
                    }}
                  >
                    {message.content}
                  </div>
                ) : (
                  /* 추천 항목을 표시하는 경우 */
                  <div
                    className={`wrap-anywhere text-[15px] py-3 px-4 max-w-sm rounded-lg whitespace-pre-wrap
                    ${message.type === 'human' ? 'ml-auto border border-tadak-gray/30' : 'mr-auto bg-tadak-light-gray'}`}
                    style={{
                      overflowWrap: 'break-word',
                    }}
                  >
                    {message.content}
                    <Recommendations
                      recommendations={message.recommendations}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
          {isLoading && <LoadingBubble />}
        </AnimatePresence>
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatbotMessages
