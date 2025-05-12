import { Bot } from 'lucide-react'

interface ChatbotToggleButtonProps {
  onClick: () => void
}

const ChatbotToggleButton = ({ onClick }: ChatbotToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-tadak-primary h-16 w-16 rounded-full flex items-center justify-center"
      style={{
        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.32)',
        position: 'relative',
        zIndex: 60,
      }}
    >
      <Bot size={40} className="text-tadak-white" />
    </button>
  )
}

export default ChatbotToggleButton
