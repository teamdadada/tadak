import Divider from '@/components/account/Divider'
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
import ServiceLogin from './ServiceLogin'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <ServiceLogin />
        <Divider text="OR" />
        <KakaoLogin />
        <NaverLogin />

        <div className="flex justify-center text-sm text-gray-500">
          <p>
            회원이 아니신가요?{' '}
            <a href="/account/signup" className="hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
