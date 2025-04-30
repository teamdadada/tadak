import InputField from '@/components/account/InputField'
import { Button } from '@/components/ui/button'

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center my-11">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-3xl text-center font-bold">Sign In</h1>
        <div className="flex flex-col gap-4">
          <InputField
            id="nickname"
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력하세요."
          />
          <InputField
            id="id"
            type="text"
            label="아이디"
            placeholder="아이디를 입력하세요."
          />
          <div>
            <InputField
              id="password1"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
            />
            <p className="text-xs mt-1 ml-1">
              영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
            </p>
          </div>
          <InputField
            id="password2"
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력하세요."
          />
        </div>

        <Button className="w-full py-6 rounded-lg bg-orange-400 hover:bg-orange-400 shadow-none">
          회원가입
        </Button>

        <div className="flex justify-center text-sm text-gray-500">
          <p>
            이미 계정이 있다면?{' '}
            <a href="/account/login" className="hover:underline">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
