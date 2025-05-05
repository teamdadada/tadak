import KeyboardLayout from '@/components/sound-test/keyboardLayout'
import { useEffect, useState } from 'react'

const TypingArea = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeKeys.includes(e.code)) {
        setActiveKeys((prev) => [...prev, e.code])
      }
      if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key)
      } else if (e.key === 'Backspace') {
        setTypedText((prev) => prev.slice(0, -1))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys((prev) => prev.filter((key) => key !== e.code))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [activeKeys])

  const handleKeyClick = (keyCode: string) => {
    console.log(keyCode)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
      <div>
        <div>
          <p>{typedText}</p>
        </div>
        <KeyboardLayout activeKeys={activeKeys} onKeyClick={handleKeyClick} />
      </div>
    </div>
  )
}

export default TypingArea
