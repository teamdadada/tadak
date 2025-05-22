import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatbotToggleButton from './ChatbotToggleButton'
import ChatbotWindow from './ChatbotWindow'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const chatbotRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 챗봇이 열려있고, 클릭된 요소가 챗봇 컨테이너 외부인 경우
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={chatbotRef}>
      <AnimatePresence>{isOpen && <ChatbotWindow />}</AnimatePresence>
      <ChatbotToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Chatbot
