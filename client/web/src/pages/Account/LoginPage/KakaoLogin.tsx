import { Button } from '@/components/ui/button'
import { LoginProps } from './ServiceLogin'

const KakaoLogin = ({ from }: LoginProps) => {
  const handleKakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI
    const state = encodeURIComponent(from)

    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?response_type=code` +
      `&client_id=${REST_API_KEY}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&state=${state}`
  }

  return (
    <Button
      className="w-full h-12 rounded-lg flex items-center justify-center bg-[#FEE500] hover:bg-[#FEE500] text-[#191919] font-medium shadow-none"
      onClick={handleKakaoLogin}
    >
      <div className="flex items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C6.92 4 2.81 7.16 2.81 11.03C2.81 13.45 4.25 15.59 6.5 16.88L5.58 20.11C5.51 20.31 5.73 20.48 5.91 20.37L9.82 17.88C10.53 17.98 11.26 18.03 12 18.03C16.97 18.03 21.19 14.87 21.19 11C21.19 7.13 17.08 4 12 4Z"
            fill="#191919"
          />
        </svg>
        <span className="ml-2">카카오 계정으로 로그인</span>
      </div>
    </Button>
  )
}

export default KakaoLogin
