import { useState, useEffect } from 'react'
import TaduckFace from '@/assets/images/taduck_face.png'

interface ChatbotToggleButtonProps {
  onClick: () => void
  isOpen: boolean
}

const ChatbotToggleButton = ({ onClick, isOpen }: ChatbotToggleButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)

  // 처음 페이지 로드 시 툴팁 표시하기
  useEffect(() => {
    if (isOpen) {
      setIsTooltipVisible(false)
      return
    }

    // 페이지 로드 3초 후 툴팁 표시
    const showTooltipTimer = setTimeout(() => {
      setIsTooltipVisible(true)
    }, 3000)

    // 툴팁 8초 후 숨기기
    const hideTooltipTimer = setTimeout(() => {
      setIsTooltipVisible(false)
    }, 11000)

    return () => {
      clearTimeout(showTooltipTimer)
      clearTimeout(hideTooltipTimer)
    }
  }, [isOpen]) // isOpen 상태가 변경될 때마다 이펙트 재실행

  // 가끔씩 튀어오르는 효과 (시간이 지나도 사용자에게 상기시키기 위한 효과)
  // 챗봇이 닫혀있을 때만 적용
  useEffect(() => {
    if (isOpen) {
      setIsBouncing(false)
      return
    }

    // 페이지 로드 20초 후부터 시작
    const initialDelay = setTimeout(() => {
      setIsBouncing(true)
      setTimeout(() => setIsBouncing(false), 1000)

      // 이후 60초마다 반복
      const bounceInterval = setInterval(() => {
        // 챗봇이 닫혀있을 때만 바운스 효과 적용
        if (!isOpen) {
          setIsBouncing(true)
          setTimeout(() => setIsBouncing(false), 1000)
        }
      }, 60000) // 1분마다 한 번씩 튀어오르기

      return () => clearInterval(bounceInterval)
    }, 20000)

    return () => clearTimeout(initialDelay)
  }, [isOpen])

  // 마우스 호버 시 챗봇이 닫혀있을 때만 툴팁 표시
  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsTooltipVisible(true)
    }
  }

  const handleMouseLeave = () => {
    setIsTooltipVisible(false)
  }

  return (
    <button
      onClick={onClick}
      className={`bg-tadak-primary h-16 w-16 rounded-full flex items-center justify-center 
                  hover:bg-tadak-primary/90 transition-all duration-300 ease-in-out
                  ${isBouncing ? 'animate-bounce' : ''}`}
      style={{
        boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.32)',
        zIndex: 60,
      }}
      aria-label={isOpen ? '채팅 도우미 닫기' : '채팅 도우미 열기'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={TaduckFace} alt="타덕" className="p-2" />

      {/* 사용자에게 챗봇 기능 알리는 말풍선 (챗봇이 닫혀있을 때만 표시) */}
      {!isOpen && (
        <div
          className={`absolute -top-14 right-0 bg-white p-2 rounded-lg shadow-lg
                      text-sm whitespace-nowrap transition-opacity duration-300
                      ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-tadak-primary font-medium">
            키보드 추천받아 보세요!
          </div>
          <div className="absolute bottom-0 shadow-lg right-6 w-3 h-3 bg-white transform rotate-45 translate-y-1/2"></div>
        </div>
      )}
    </button>
  )
}

export default ChatbotToggleButton
