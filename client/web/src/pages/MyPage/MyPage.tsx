import { useState } from 'react'

import MypageSideTab from './MypageSidebar.tsx'
import UserProfile from './UserProfile.tsx'
import UserFavorites from './UserFavorites.tsx'
import UserReview from './UserReview.tsx'
import UserShoppingHistory from './UserShoppingHistory.tsx'
import UserCart from './UserCart.tsx'

export type MenuType =
  | '좋아요'
  | '장바구니'
  | '회원 정보'
  | '결제 내역'
  | '작성한 리뷰'

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('회원 정보')

  const handleMenuChange = (menu: MenuType) => {
    setSelectedMenu(menu)
  }

  const renderContent = () => {
    switch (selectedMenu) {
      case '좋아요':
        return <UserFavorites />
      case '장바구니':
        return <UserCart />
      case '회원 정보':
        return <UserProfile />
      case '결제 내역':
        return <UserShoppingHistory />
      case '작성한 리뷰':
        return <UserReview />
      default:
        return <UserFavorites />
    }
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row min-h-screen">
      <MypageSideTab
        selectedMenu={selectedMenu}
        onMenuChange={handleMenuChange}
      />

      <div className="flex-1 mt-14 px-6">
        <h1 className="text-3xl font-bold mb-10 px-3">{selectedMenu}</h1>
        {renderContent()}
      </div>
    </div>
  )
}

export default MyPage
