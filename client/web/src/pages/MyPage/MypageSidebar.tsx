import { MenuType } from './MyPage'

interface SidebarProps {
  selectedMenu: MenuType
  onMenuChange: (menu: MenuType) => void
}

interface MenuCategory {
  title: string
  items: MenuType[]
}

const MypageSidebar = ({ selectedMenu, onMenuChange }: SidebarProps) => {
  const menuCategories: MenuCategory[] = [
    {
      title: '나의 계정정보',
      items: ['회원 정보'],
    },
    {
      title: '나의 쇼핑정보',
      items: ['결제 내역', '작성한 리뷰'],
    },
  ]

  return (
    <div className="w-full md:w-64 p-6 mt-10">
      {/* 프로필 */}
      <div className="flex flex-col gap-6 mb-4">
        {/* 프로필 사진 */}
        <div className="bg-tadak-light-gray flex items-center justify-center">
          <svg
            className="text-tadak-gray"
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
        {/* 닉네임 */}
        <div className="px-1">
          <p className="text-3xl font-extrabold">다이다이</p>
        </div>
      </div>

      <div className="flex flex-col mb-6 font-semibold text-[15px]">
        <button
          onClick={() => onMenuChange('좋아요')}
          className={`flex justify-between items-center p-2 rounded ${
            selectedMenu === '좋아요'
              ? 'font-bold '
              : 'bg-white hover:underline'
          }`}
        >
          좋아요 3
        </button>

        <button
          onClick={() => onMenuChange('장바구니')}
          className={`flex justify-between items-center p-2 rounded ${
            selectedMenu === '장바구니'
              ? 'font-bold '
              : 'bg-white hover:underline'
          }`}
        >
          장바구니 4
        </button>
      </div>

      {/* 메뉴 목록 */}
      <div className="space-y-6">
        {menuCategories.map((category) => (
          <div key={category.title} className="space-y-2">
            <h3 className="px-1 text-md font-extrabold text-tadak-black">
              {category.title}
            </h3>
            <ul className="text-tadak-dark-gray">
              {category.items.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onMenuChange(item)}
                    className={`w-full text-left py-2 px-3 ${
                      selectedMenu === item
                        ? 'font-medium text-tadak-black'
                        : ' hover:underline'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MypageSidebar
