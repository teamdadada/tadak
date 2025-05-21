import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react'

interface ChatbotInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

const ChatbotInput = ({ onSend, disabled = false }: ChatbotInputProps) => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus()
    }
  }, [disabled])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-tadak-light-gray"
    >
      <div className="flex gap-4 items-center">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled ? '타덕이 대답 중...' : '메시지를 입력하세요...'
          }
          disabled={disabled}
          className={`flex-1 border p-5 min-w-44 border-tadak-light-gray rounded-lg ${
            disabled ? 'bg-tadak-light-gray text-tadak-black' : ''
          }`}
        />
        <Button
          type="submit"
          disabled={!input.trim() || disabled}
          className={`px-4 py-5 ${
            !input.trim() || disabled
              ? 'bg-tadak-gray text-tadak-black hover:bg-tadak-gray cursor-not-allowed'
              : 'bg-tadak-primary text-white hover:bg-tadak-primary'
          }`}
        >
          전송
        </Button>
      </div>
    </form>
  )
}

export default ChatbotInput
