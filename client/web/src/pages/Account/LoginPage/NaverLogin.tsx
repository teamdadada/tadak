import { Button } from '@/components/ui/button'

const NaverLogin = () => {
  const handleNaverLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_NAVER_REST_API_KEY
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
  }
  return (
    <Button
      className="w-full h-12 rounded-lg flex items-center justify-center bg-[#03C75A] hover:bg-[#03C75A] text-white font-medium shadow-none"
      onClick={handleNaverLogin}
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
            d="M14.9 12.612L9.1 4H4V20H9.1V11.388L14.9 20H20V4H14.9V12.612Z"
            fill="white"
          />
        </svg>
        <span className="ml-2">네이버 계정으로 로그인</span>
      </div>
    </Button>
  )
}

export default NaverLogin
