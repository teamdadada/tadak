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
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex gap-4 items-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border p-5 border-gray-200 rounded-lg"
        />
        <Button type="submit" className="px-3 py-5">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2938 3.10773C22.8338 1.61398 21.3863 0.166485 19.8926 0.707735L1.6363 7.31024C0.137553 7.85274 -0.0436976 9.89774 1.33505 10.6965L7.16255 14.0702L12.3663 8.86648C12.6021 8.63879 12.9178 8.51279 13.2456 8.51564C13.5733 8.51849 13.8868 8.64995 14.1186 8.88171C14.3503 9.11347 14.4818 9.42699 14.4846 9.75473C14.4875 10.0825 14.3615 10.3982 14.1338 10.634L8.93005 15.8377L12.3051 21.6652C13.1026 23.044 15.1476 22.8615 15.6901 21.364L22.2938 3.10773Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>
    </form>
  )
}

export default ChatbotInput
