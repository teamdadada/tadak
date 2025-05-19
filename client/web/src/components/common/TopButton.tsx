import { useState, useEffect } from 'react'

interface BackToTopButtonProps {
  showBelow?: number
  className?: string
}

/**
 * 또잉또잉 애니메이션
 */
const TopButton = ({
  showBelow = 300,
  className = '',
}: BackToTopButtonProps) => {
  // 버튼 표시 여부 상태
  const [isVisible, setIsVisible] = useState(false)

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > showBelow) {
      if (!isVisible) setIsVisible(true)
    } else {
      if (isVisible) setIsVisible(false)
    }
  }

  // 최상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // 컴포넌트 마운트 시 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  const boingBoingStyle = {
    animation: 'boingBoing 2s infinite',
  }

  const animationStyle = `
    @keyframes boingBoing {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateX(-50%) translateY(-15px);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      70% {
        transform: translateX(-50%) translateY(-5px);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      85% {
        transform: translateX(-50%) translateY(-2px);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  `

  return (
    <>
      <style>{animationStyle}</style>

      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="스크롤 최상단으로 이동"
          style={boingBoingStyle}
          className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3 
            bg-transparent transition-all duration-300 z-50 
            text-tadak-primary hover:animate-none ${className}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default TopButton
