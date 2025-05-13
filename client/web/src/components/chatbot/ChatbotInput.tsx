import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface Props {
  onSend: (message: string) => void
}

const ChatbotInput = ({ onSend }: Props) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(input)
    setInput('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-tadak-light-gray"
    >
      <div className="flex gap-4 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border p-5 border-tadak-light-gray rounded-lg "
        />
        <Button type="submit" className="px-4 py-5 ">
          전송
        </Button>
      </div>
    </form>
  )
}

export default ChatbotInput
