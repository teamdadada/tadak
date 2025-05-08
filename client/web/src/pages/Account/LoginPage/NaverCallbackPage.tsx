import LogoImage from '@/assets/images/logo.png'
import { naverLogin } from '@/services/authService'

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const NaverCallback = () => {
  const navigate = useNavigate()
  const isProcessingRef = useRef(false)
  const errorTimerRef = useRef<number | null>(null)

  useEffect(() => {
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const startTime = Date.now()

      // 이미 처리 중이면 중복 실행 방지
      if (isProcessingRef.current) return
      isProcessingRef.current = true

      try {
        // URL에서 인증 코드 추출
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (!code) {
          toast.error('인증 코드를 받지 못했습니다')
          errorTimerRef.current = window.setTimeout(() => {
            navigate('/account/login', { replace: true })
          }, 2000)
          return
        }

        // 로그인 처리
        await naverLogin(code)

        // 경과 시간 계산
        const elapsedTime = Date.now() - startTime
        const minDisplayTime = 500 // 최소 표시 시간 (ms)

        // 최소 표시 시간을 보장
        if (elapsedTime < minDisplayTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minDisplayTime - elapsedTime),
          )
        }

        // 로그인 성공
        toast.success('네이버로 로그인하였습니다!')
        navigate('/main', { replace: true })
      } catch (err) {
        console.error('네이버 로그인 오류:', err)
        toast.error('로그인 처리 중 오류가 발생했습니다')

        errorTimerRef.current = window.setTimeout(() => {
          navigate('/account/login', { replace: true })
        }, 2000)
      }
    }

    handleKakaoCallback()
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="mb-3">
        <span className="inline-flex ml-1">
          <span className="animate-bounce delay-0 mx-1 h-3 w-3 rounded-full bg-tadak-primary"></span>
          <span
            className="animate-bounce delay-300 mx-1 h-3 w-3 rounded-full bg-tadak-primary"
            style={{ animationDelay: '0.2s' }}
          ></span>
          <span
            className="animate-bounce delay-600 mx-1 h-3 w-3 rounded-full bg-tadak-primary"
            style={{ animationDelay: '0.4s' }}
          ></span>
        </span>
      </div>

      <div className="mb-2">
        <img src={LogoImage} alt="타닥 로고" className="w-28" />
      </div>

      <h1 className="text-2xl font-bold text-tadak-black mb-1 tracking-tight">
        로그인 중
      </h1>
      <p className="text-tadak-dark-gray mb-10 text-center">
        잠시만 기다려주세요
      </p>
    </div>
  )
}

export default NaverCallback
