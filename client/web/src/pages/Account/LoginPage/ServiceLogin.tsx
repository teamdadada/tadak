import LogoImage from '@/assets/images/logo.png'
import InputField from '@/components/account/InputField'
import { Button } from '@/components/ui/button'
import { useSignIn } from '@/services/userService'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ServiceLogin = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const signIn = useSignIn()

  const handleLogin = async () => {
    signIn({ userId, password })
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
      </form>
      <Button
        onClick={handleLogin}
        className="w-full py-6 rounded-lg shadow-none bg-tadak-primary hover:bg-tadak-primary"
      >
        로그인
      </Button>
    </div>
  )
}

export default ServiceLogin
