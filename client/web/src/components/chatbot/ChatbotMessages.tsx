import { useEffect, useRef } from 'react'
import { Message } from './ChatbotWindow'

const ChatbotMessages = ({ messages }: { messages: Message[] }) => {
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
      className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto"
      style={{ scrollbarGutter: 'stable' }}
    >
      {messages.map((msg, i) => {
        if (msg.type === 'user') {
          return (
            <div
              key={i}
              className="py-2 px-4 max-w-sm border rounded-lg ml-auto border-tadak-light-gray shadow-sm shadow-tadak-light-gray whitespace-pre-wrap"
            >
              {msg.text}
            </div>
          )
        }

        return (
          <div key={i} className="flex items-end gap-2 mb-2 max-w-full">
            <img
              src="/tadak.png"
              alt="taduck"
              className="w-8 h-8 rounded-full border border-tadak-light-gray"
            />
            <div className="py-2 px-4 rounded-lg bg-tadak-light-gray text-black whitespace-pre-wrap max-w-sm">
              {msg.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatbotMessages
