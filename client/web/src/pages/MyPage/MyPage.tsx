import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MypageSideTab from './MypageSidebar.tsx'
import UserProfile from './UserProfile.tsx'
import UserLikes from './UserLikes.tsx'
import UserReview from './UserReview.tsx'
import UserShoppingHistory from './UserShoppingHistory.tsx'
import UserCart from './UserCart.tsx'
import MypageMobileMenuBar from './MypageMobileMenuBar.tsx'

export type MenuType =
  | '찜'
  | '장바구니'
  | '회원 정보'
  | '결제 내역'
  | '작성한 리뷰'

const MyPage = () => {
  const [searchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as MenuType | null

  const [selectedMenu, setSelectedMenu] = useState<MenuType>(
    tabParam || '회원 정보',
  )

  const handleMenuChange = (menu: MenuType) => {
    setSelectedMenu(menu)
  }

  const renderContent = () => {
    switch (selectedMenu) {
      case '찜':
        return <UserLikes />
      case '장바구니':
        return <UserCart />
      case '회원 정보':
        return <UserProfile />
      case '결제 내역':
        return <UserShoppingHistory />
      case '작성한 리뷰':
        return <UserReview />
      default:
        return <UserLikes />
    }
  }

  return (
    <div className="container mx-auto min-h-screen max-w-7xl">
      {/* 모바일 메뉴 */}
      <div className="md:hidden">
        <MypageMobileMenuBar
          selectedMenu={selectedMenu}
          onMenuChange={handleMenuChange}
        />
      </div>

      {/* 모바일 컨텐츠 */}
      <div className="md:hidden mt-8 px-4">{renderContent()}</div>

      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:flex flex-row">
        <MypageSideTab
          selectedMenu={selectedMenu}
          onMenuChange={handleMenuChange}
        />

        <div className="flex-1 mt-14 px-6 overflow-hidden w-full">
          <h1 className="text-3xl font-bold mb-10 px-3">{selectedMenu}</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default MyPage
