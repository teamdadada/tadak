import LogoImage from '@/assets/images/logo.png'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useKakaoLogin } from '@/hooks/useAuth'

const KakaoCallback = () => {
  const navigate = useNavigate()
  const { login } = useKakaoLogin()

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')

    if (!code) {
      toast.error('인증 코드가 없습니다.')
      navigate('/account/login', { replace: true })
      return
    }

    login(code)
  }, [login, navigate])

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

export default KakaoCallback
