import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatbotToggleButton from './ChatbotToggleButton'
import ChatbotWindow from './ChatbotWindow'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>{isOpen && <ChatbotWindow />}</AnimatePresence>
      <ChatbotToggleButton onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Chatbot
