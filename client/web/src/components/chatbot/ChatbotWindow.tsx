import { useState } from 'react'
import { motion } from 'framer-motion'
import ChatbotHeader from './ChatbotHeader'
import ChatbotMessages from './ChatbotMessages'
import ChatbotInput from './ChatbotInput'

export interface Message {
  type: 'user' | 'bot'
  text: string
}

const ChatbotWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
  ])

  const handleSendMessage = (input: string) => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: input },
      { type: 'bot', text: '꽥' },
    ])
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute bottom-20 right-4 w-[400px] md:w-[500px] lg:w-[600px] h-[500px] overflow-visible z-50"
    >
      <div className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden shadow-md">
        <ChatbotHeader />
        <ChatbotMessages messages={messages} />
        <ChatbotInput onSend={handleSendMessage} />
      </div>
    </motion.div>
  )
}

export default ChatbotWindow
