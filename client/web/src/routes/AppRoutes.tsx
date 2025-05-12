import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 페이지 컴포넌트
import OnboardingPage from '@/pages/OnboardingPage/OnboardingPage'
import MainPage from '@/pages/MainPage/MainPage'
import LoginPage from '@/pages/Account/LoginPage/LoginPage'
import SignupPage from '@/pages/Account/SignupPage/SignupPage'
import MyPage from '@/pages/MyPage/MyPage'
import ShopPage from '@/pages/ShopPage/ShopPage'
import CustomKeyboardPage from '@/pages/CustomKeyboardPage/CustomKeyboardPage'
import SoundTestPage from '@/pages/SoundTestPage/SoundTestPage'
import KbtiPage from '@/pages/KbtiPage/KbtiPage'
import NotFound from '@/pages/NotFound/NotFound'

// 레이아웃
import BaseLayout from '@/components/layout/BaseLayout'
import SimpleLayout from '@/components/layout/SimpleLayout'
import ProductDetailPage from '@/pages/ProductPage/ProductDatailPage'
import KakaoCallback from '@/pages/Account/LoginPage/KakaoCallbackPage'
import NaverCallback from '@/pages/Account/LoginPage/NaverCallbackPage'
import KbtiTestPage from '@/pages/KbtiPage/KbtiTestPage'
import KbtiResultPage from '@/pages/KbtiPage/KbtiResultpage'
import KbtiStartPage from '@/pages/KbtiPage/KbtiStartPage'
import ProtectedRoute from '@/components/common/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <OnboardingPage /> }, // 온보딩 페이지
      { path: 'main', element: <MainPage /> }, // 메인 페이지
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      }, // 마이페이지
      { path: 'shop', element: <ShopPage /> }, // 쇼핑 페이지
      { path: 'customkeyboard', element: <CustomKeyboardPage /> }, // 커스텀 키보드 제작 페이지
      { path: 'soundtest', element: <SoundTestPage /> }, // 타건샵 페이지
      {
        path: 'kbti',
        element: <KbtiPage />,
        children: [
          { path: '', element: <KbtiStartPage /> },
          { path: 'test', element: <KbtiTestPage /> },
          { path: 'result', element: <KbtiResultPage /> },
        ],
      }, // KBTI 페이지
      { path: 'product/:type/:id', element: <ProductDetailPage /> }, // 제품 상세 페이지
    ],
  },

  {
    path: 'account',
    element: <SimpleLayout />,
    children: [
      { path: 'login', element: <LoginPage /> }, // 로그인 페이지
      { path: 'signup', element: <SignupPage /> }, // 회원가입 페이지
    ],
  },

  {
    path: 'auth',
    element: <SimpleLayout />,
    children: [
      { path: 'kakao/callback', element: <KakaoCallback /> },
      { path: 'naver/callback', element: <NaverCallback /> },
    ],
  },

  // 404 NotFound
  {
    path: '*',
    element: <NotFound />,
  },
])

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
