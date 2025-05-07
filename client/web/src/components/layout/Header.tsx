import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '@/assets/images/logo.png'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isOnboarding = location.pathname === '/'

  const { isAuthenticated, clearAccessToken } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    clearAccessToken()
    toast.success('로그아웃 되었습니다.')
    navigate('/main') // 메인 페이지로 이동
    setIsMenuOpen(false) // 모바일 메뉴 닫기
  }
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto px-6 relative">
        {/* 로고 */}
        <Link
          to="/main"
          className="flex items-center justify-center min-[1200px]:justify-start w-full min-[1200px]:w-auto min-[1060px]:pl-2"
        >
          <img src={logo} alt="logo" className="w-12" />
        </Link>

        {/* 온보딩일 경우 로그인 버튼만 */}
        {isOnboarding ? (
          isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-20 py-1 text-sm font-semibold text-tadak-white text-center rounded-full bg-tadak-primary hover:bg-tadak-primary whitespace-nowrap"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/account/login"
              className="w-20 py-1 text-sm font-semibold text-tadak-white text-center rounded-full bg-tadak-primary hover:bg-tadak-primary whitespace-nowrap"
            >
              Login
            </Link>
          )
        ) : (
          <>
            {/* 검색창 */}
            <div className="flex-1 mx-20 hidden min-[1200px]:block">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full max-w-[32rem] min-w-[12rem] h-9 px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>

            {/* 네비게이션 */}
            <div className="hidden min-[1200px]:flex items-center space-x-8 text-sm text-[#242424] font-medium">
              <Link
                to="/shop"
                className="px-3 py-1 rounded-md hover:bg-gray-100 whitespace-nowrap"
              >
                쇼핑
              </Link>
              <Link
                to="/customkeyboard"
                className="px-3 py-1 rounded-md hover:bg-gray-100 whitespace-nowrap"
              >
                타닥 키보드 만들기
              </Link>
              <Link
                to="/soundtest"
                className="px-3 py-1 rounded-md hover:bg-gray-100 whitespace-nowrap"
              >
                타닥 타건샵
              </Link>
              <Link
                to="/kbti"
                className="px-3 py-1 rounded-md hover:bg-gray-100 whitespace-nowrap"
              >
                KBTI
              </Link>
              <Link
                to="/mypage"
                className="px-3 py-1 rounded-md hover:bg-gray-100 whitespace-nowrap"
              >
                마이페이지
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-20 py-1 text-sm font-semibold text-tadak-white text-center rounded-full bg-tadak-primary hover:bg-tadak-primary whitespace-nowrap"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/account/login"
                  className="w-20 py-1 text-sm font-semibold text-tadak-white text-center rounded-full bg-tadak-primary hover:bg-tadak-primary whitespace-nowrap"
                >
                  Login
                </Link>
              )}
            </div>

            {/* 모바일 햄버거 버튼 */}
            <div className="flex min-[1200px]:hidden ml-auto">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>

            {/* 모바일 메뉴 오버레이 */}
            {isMenuOpen && (
              <div className="fixed top-0 right-0 w-3/5 h-screen bg-white shadow-lg border-l flex flex-col p-6 space-y-6 z-50">
                <div className="flex items-center justify-end mb-1">
                  <button onClick={() => setIsMenuOpen(false)}>
                    <FiX size={28} />
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full h-10 px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <nav className="flex flex-col space-y-6 text-lg font-medium text-[#242424]">
                  <Link
                    to="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    쇼핑
                  </Link>
                  <Link
                    to="/customkeyboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    타닥 키보드 만들기
                  </Link>
                  <Link
                    to="/soundtest"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    타닥 타건샵
                  </Link>
                  <Link
                    to="/kbti"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    KBTI
                  </Link>
                  <Link
                    to="/mypage"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    마이페이지
                  </Link>

                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left hover:bg-gray-100 rounded-md px-2 py-1"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/account/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:bg-gray-100 rounded-md px-2 py-1"
                    >
                      Login
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default Header
