import { useState } from 'react'
import ItemCard from './ItemCard'
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import KeyboardModal from './modals/KeyboardModal'
import DeskModal from './modals/DeskModal'

interface Item {
  id: number
  name: string
  imageUrl: string
}

interface ItemGridProps {
  items: Item[]
  itemType: 'keyboard' | 'desk'
}

const ItemGrid = ({ items, itemType }: ItemGridProps) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            itemType={itemType}
            isOpen={openItemId === item.id}
            onOpenChange={(open) => setOpenItemId(open ? item.id : null)}
          />
        ))}

        {/* 아이템 추가 버튼 */}
        <button
          onClick={handleAddClick}
          className="w-[181px] h-28 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-sm"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen &&
        (itemType === 'keyboard' ? (
          <KeyboardModal onClose={handleCloseModal} />
        ) : (
          <DeskModal onClose={handleCloseModal} />
        ))}
    </>
  )
}

export default ItemGrid