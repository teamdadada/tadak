import { useEffect, useState, useRef, useCallback } from 'react'
import { typingSentencesGroup } from '@/mocks/typingSentecnes'
import KeyboardLayout from '@/components/sound-test/KeyboardLayout'
import { useSoundStore } from '@/store/soundStore'

const TypingArea = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [typedText, setTypedText] = useState('')
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [selectedSentences, setSelectedSentences] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const audioCache = useRef<Record<string, HTMLAudioElement>>({})

  const selectedSoundKey = useSoundStore((state) => state.selectedSoundKey)

  // 자동 포커스
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const isFocused = document.activeElement === inputRef.current
      if (!isFocused && inputRef.current) {
        inputRef.current.focus()
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const playSound = useCallback(
    (keyCode: string) => {
      if (!selectedSoundKey) {
        return
      }

      const keyboardTypeMap = {
        저소음: 'silent',
        'G PRO 2.0': 'gpro2',
      } as const

      const colorMap = {
        적축: 'red',
        청축: 'blue',
        황축: 'yellow',
        갈축: 'brown',
        백축: 'white',
        흑축: 'black',
        은축: 'silver',
      } as const

      const keyTypeMap = {
        Space: 'space',
        Enter: 'enter',
        Backspace: 'enter',
        ShiftLeft: 'enter',
        ShiftRight: 'enter',
        Tab: 'enter',
        CapsLock: 'enter',
      }

      const lastSpaceIndex = selectedSoundKey.lastIndexOf(' ')
      const korKeyboardType = selectedSoundKey.substring(0, lastSpaceIndex)
      const korColor = selectedSoundKey.substring(lastSpaceIndex + 1)

      const keyboardType =
        keyboardTypeMap[korKeyboardType as keyof typeof keyboardTypeMap]
      const color = colorMap[korColor as keyof typeof colorMap]

      const soundType =
        keyTypeMap[keyCode as keyof typeof keyTypeMap] || 'normal'

      // 최종 소리 파일 경로 생성
      const soundPath = `/sounds/${keyboardType}_${color}_${soundType}.mp3`
      const cachedAudio = audioCache.current[soundPath] || new Audio(soundPath)
      if (!audioCache.current[soundPath]) {
        audioCache.current[soundPath] = cachedAudio
      }
      cachedAudio.currentTime = 0
      cachedAudio.play()
    },
    [selectedSoundKey],
  )
  // 현재 문장
  const currentSentence = selectedSentences[currentSentenceIndex] ?? ''

  // 랜덤 가사 선택
  useEffect(() => {
    const songKeys = Object.keys(typingSentencesGroup)
    const randomKey = songKeys[Math.floor(Math.random() * songKeys.length)]
    setSelectedSentences(typingSentencesGroup[randomKey])
  }, [])

  // 키보드 키 입력 시 하이라이팅 및 소리 재생
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 키 누를 때 소리 재생
      playSound(e.code)

      if (!activeKeys.includes(e.code)) {
        setActiveKeys((prev) => [...prev, e.code])
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
  }, [activeKeys, playSound])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    setTypedText(newText)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (currentSentenceIndex < selectedSentences.length - 1) {
        setCurrentSentenceIndex((prev) => prev + 1)
      } else {
        setCurrentSentenceIndex(0)
      }

      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.focus()
      }

      setTypedText('')
    }
  }

  const renderColoredLetters = () => {
    return currentSentence.split('').map((letter, index) => {
      const typedChar = typedText[index]

      if (index >= typedText.length - 1) {
        return (
          <span key={index} className="text-tadak-light-gray">
            {letter}
          </span>
        )
      }

      // 맞은 글자
      if (typedChar === letter) {
        return (
          <span key={index} className="text-tadak-secondary">
            {letter}
          </span>
        )
      }

      // 틀린 글자
      return (
        <span key={index} className="text-tadak-warning">
          {letter}
        </span>
      )
    })
  }
  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
      <div className="bg-tadak-black px-5 py-3 rounded-lg text-lg font-medium mb-4">
        {renderColoredLetters()}
      </div>

      <div className="mb-4 px-2">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-5 py-3 ring-0 focus:ring-0 shadow-none focus:shadow-none focus:outline-none border-none focus:border-none text-lg font-medium"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
        <hr className="border-[1.5px] border-tadak-dark-gray" />
      </div>
      <KeyboardLayout activeKeys={activeKeys} />
    </div>
  )
}

export default TypingArea
