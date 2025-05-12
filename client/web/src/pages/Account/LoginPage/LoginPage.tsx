import Divider from '@/components/account/Divider'
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
import ServiceLogin from './ServiceLogin'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/main'

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <ServiceLogin navigate={navigate} from={from} />
        <Divider text="OR" />
        <KakaoLogin navigate={navigate} from={from} />
        <NaverLogin navigate={navigate} from={from} />

        <div className="flex justify-center text-sm text-tadak-dark-gray">
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
