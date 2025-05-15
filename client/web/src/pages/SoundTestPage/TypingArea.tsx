import { useEffect, useState, useRef, useCallback } from 'react'
import { typingSentencesGroup } from '@/mocks/typingSentecnes'
import KeyboardLayout from '@/components/sound-test/KeyboardLayout'
import { useSoundStore } from '@/store/soundStore'

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

const TypingArea = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [typedText, setTypedText] = useState('')
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [selectedSentences, setSelectedSentences] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  // 오디오 객체
  const audioRef = useRef<Record<string, HTMLAudioElement>>({})

  // 마지막 키 입력 시간
  const lastKeyPressTimeRef = useRef<Record<string, number>>({})

  // 현재 재생 중인 오디오
  const currentPlayingRef = useRef<Record<string, boolean>>({})

  const selectedSoundKey = useSoundStore((state) => state.selectedSoundKey)

  // 자동 포커스
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  // 포커스 유지
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

      // 키 연속 입력 방지
      const now = Date.now()
      const lastPressTime = lastKeyPressTimeRef.current[keyCode] || 0
      const timeSinceLastPress = now - lastPressTime

      const KEY_REPEAT_THRESHOLD = 50 // 같은 키가 50ms 이내에 다시 눌리면 소리 재생 안 함
      if (timeSinceLastPress < KEY_REPEAT_THRESHOLD) {
        return
      }

      lastKeyPressTimeRef.current[keyCode] = now

      // mp3 파일 매핑
      const lastSpaceIndex = selectedSoundKey.lastIndexOf(' ')
      const korKeyboardType = selectedSoundKey.substring(0, lastSpaceIndex)
      const korColor = selectedSoundKey.substring(lastSpaceIndex + 1)

      const keyboardType =
        keyboardTypeMap[korKeyboardType as keyof typeof keyboardTypeMap]
      const color = colorMap[korColor as keyof typeof colorMap]

      const soundType =
        keyTypeMap[keyCode as keyof typeof keyTypeMap] || 'normal'

      const soundPath = `/sounds/${keyboardType}_${color}_${soundType}.mp3` // 최종 소리 파일 경로 생성

      // 새 오디오 객체 생성 또는 재사용
      let audio = audioRef.current[keyCode]
      if (!audio) {
        audio = new Audio(soundPath)
        audioRef.current[keyCode] = audio
      } else {
        audio.src = soundPath // 경로가 변경되었을 수 있으므로 업데이트
      }

      // 재생 완료 시 상태 업데이트를 위한 이벤트 리스너
      const handleEnded = () => {
        currentPlayingRef.current[keyCode] = false
      }

      // 이전 이벤트 리스너 제거 후 새로 추가
      audio.removeEventListener('ended', handleEnded)
      audio.addEventListener('ended', handleEnded)

      // 재생 상태 업데이트 및 재생
      currentPlayingRef.current[keyCode] = true

      try {
        audio.currentTime = 0 // 재생 위치를 처음으로 되돌림
        audio.play().catch(() => {
          currentPlayingRef.current[keyCode] = false
        })
      } catch {
        currentPlayingRef.current[keyCode] = false
      }
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

  // 컴포넌트 언마운트 시 오디오 객체 정리
  useEffect(() => {
    return () => {
      // 모든 오디오 객체 정리
      Object.values(audioRef.current).forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
      audioRef.current = {}
    }
  }, [])

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
