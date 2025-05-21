import LogoImage from '@/assets/images/logo.png'

import InputField from '@/components/account/InputField'
import { Button } from '@/components/ui/button'
import { useSignIn } from '@/hooks/useAuth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export interface LoginProps {
  navigate: ReturnType<typeof useNavigate>
  from: string
}

const ServiceLogin = ({ navigate, from }: LoginProps) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signIn = useSignIn()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userId.trim() || !password.trim()) {
      toast.error('아이디와 비밀번호를 모두 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      await signIn({ userId, password })
      navigate(from, { replace: true })
    } catch {
      // 실패
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/main" className="flex justify-center">
        <img src={LogoImage} alt="타닥 로고" className="h-16" />
      </Link>
      <p className="text-center text-sm">내 타닥 계정으로 로그인하기</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <InputField
          id="userId"
          type="text"
          label="아이디"
          placeholder="아이디를 입력하세요."
          autoComplete="username"
          onChange={(e) => setUserId(e.target.value)}
        />

        <InputField
          id="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full py-6 rounded-lg shadow-none bg-tadak-primary hover:bg-tadak-primary disabled:bg-tadak-dark-gray"
          disabled={isLoading}
        >
          로그인
        </Button>
      </form>
    </div>
  )
}

export default ServiceLogin
