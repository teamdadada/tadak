import { HistoryResponse } from '@/types/chatbot'
import { useEffect, useRef } from 'react'

const ChatbotMessages = ({ messages }: { messages: HistoryResponse }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div
      ref={scrollRef}
      className="flex-1 flex flex-col gap-2 p-5 overflow-y-auto"
      style={{ scrollbarGutter: 'stable' }}
    >
      {messages.map((msg, i) => {
        if (msg.type === 'human') {
          return (
            <div
              key={i}
              className="text-[15px] py-3 px-4 max-w-sm border rounded-lg ml-auto border-tadak-light-gray whitespace-pre-wrap"
            >
              {msg.content}
            </div>
          )
        }

        return (
          <div className="text-[15px] py-3 px-4 max-w-sm border-none rounded-lg mr-auto bg-tadak-light-gray whitespace-pre-wrap ">
            {msg.content}
          </div>
        )
      })}
    </div>
  )
}

export default ChatbotMessages
