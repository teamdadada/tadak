import { MenuType } from './MyPage'
import { Heart, ShoppingCart, User, CreditCard, FileEdit } from 'lucide-react'

interface MobileMenuBarProps {
  selectedMenu: MenuType
  onMenuChange: (menu: MenuType) => void
}

const MobileMenuBar = ({ selectedMenu, onMenuChange }: MobileMenuBarProps) => {
  const mainMenuItems: MenuType[] = [
    '찜',
    '장바구니',
    '회원 정보',
    '결제 내역',
    '작성한 리뷰',
  ]

  // Lucide 아이콘 매핑
  const renderIcon = (item: MenuType) => {
    const iconProps = {
      className: `${selectedMenu === item ? 'text-tadak-black' : 'text-tadak-dark-gray'}`,
      size: 20,
    }

    switch (item) {
      case '찜':
        return <Heart {...iconProps} />
      case '장바구니':
        return <ShoppingCart {...iconProps} />
      case '회원 정보':
        return <User {...iconProps} />
      case '결제 내역':
        return <CreditCard {...iconProps} />
      case '작성한 리뷰':
        return <FileEdit {...iconProps} />
      default:
        return null
    }
  }

  const menuBadges: Partial<Record<MenuType, number>> = {
    찜: 3,
    장바구니: 4,
  }

  return (
    <div className="bg-white">
      {/* 프로필 정보 */}
      <div className="py-4 px-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div className="bg-tadak-light-gray flex items-center justify-center w-12 h-12 rounded-full">
            <svg
              className="text-tadak-gray w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <p className="text-xl font-bold">다이다이</p>
        </div>
      </div>

      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-5 border-b">
        {mainMenuItems.map((item) => (
          <button
            key={item}
            onClick={() => onMenuChange(item)}
            className={`flex flex-col items-center justify-center py-4 relative ${
              selectedMenu === item
                ? 'text-tadak-black font-medium border-b-2 border-tadak-black'
                : 'text-tadak-dark-gray'
            }`}
          >
            <div className="mb-1">{renderIcon(item)}</div>
            <span className="text-xs whitespace-nowrap">{item}</span>

            {/* 배지 (좋아요, 장바구니에만 표시) */}
            {menuBadges[item] && (
              <span className="absolute top-2 right-1/4 bg-tadak-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {menuBadges[item]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileMenuBar
