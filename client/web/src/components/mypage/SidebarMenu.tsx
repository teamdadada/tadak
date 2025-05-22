import { MenuType } from '@/pages/MyPage/MyPage'

interface MenuCategory {
  title: string
  items: MenuType[]
}

interface SidebarMenuProps {
  selectedMenu: MenuType
  onMenuChange: (menu: MenuType) => void
  categories: MenuCategory[]
}

const SidebarMenu = ({
  selectedMenu,
  onMenuChange,
  categories,
}: SidebarMenuProps) => {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
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
  )
}

export default SidebarMenu
