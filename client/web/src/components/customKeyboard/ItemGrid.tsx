// src/components/customKeyboard/ItemGrid.tsx
import { useState } from 'react'
import ItemCard from './ItemCard'
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'

const mockItems = [
  { id: 1, name: '내 타닥 키보드1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 2, name: '마이 로망', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 3, name: '월급날', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 4, name: '내 타닥 키보드1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 5, name: '마이 로망', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 6, name: '월급날', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 7, name: '내 타닥 키보드1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 8, name: '마이 로망', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 9, name: '월급날', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 10, name: '마이 로망', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
  { id: 11, name: '월급날', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTcMQZNfVnj_OOiGam9QzK2e5PHYJf67xUw&s' },
]

const ItemGrid = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-3 gap-4">
      {mockItems.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isOpen={openItemId === item.id}
          onOpenChange={(open) => setOpenItemId(open ? item.id : null)}
        />
      ))}

      {/* 아이템 추가 버튼 */}
      <button className="w-[181px] h-28 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-sm">
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  )
}

export default ItemGrid