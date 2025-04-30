import logoImage from '@/assets/images/logo.png'
import InputField from '@/components/account/InputField'
import { Button } from '@/components/ui/button'

const ServiceLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <img src={logoImage} alt="logo" className="h-20 w-auto" />
      </div>
      <p className="text-center text-sm">내 타닥 계정으로 로그인하기</p>

      <div className="flex flex-col gap-4">
        <InputField
          id="id"
          type="text"
          label="아이디"
          placeholder="아이디를 입력하세요."
        />

        <InputField
          id="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요."
        />
      </div>
      <Button className="w-full py-6 rounded-lg bg-orange-400 hover:bg-orange-500">
        로그인
      </Button>
    </div>
  )
}

export default ServiceLogin
