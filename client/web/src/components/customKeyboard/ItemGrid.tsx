import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { useDeskStore } from '@/store/deskStore'
import ItemCard from './ItemCard'
import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg'
import KeyboardModal from './modals/KeyboardModal'
import DeskModal from './modals/DeskModal'
import LoginRequiredModal from '@/components/common/LoginRequiredModal'

interface Item {
  id: number
  name: string
  imageUrl: string
  canDelete?: boolean
}

interface ItemGridProps {
  items: Item[]
  itemType: 'keyboard' | 'desk'
  refetchPlacements?: () => void
}

const ItemGrid = ({ items, itemType, refetchPlacements }: ItemGridProps) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const isLoggedIn = useUserStore((state) => state.getIsLoggedIn())
  const setIsDirty = useDeskStore((state) => state.setIsDirty)

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true) // 로그인 안내 모달
      return
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    refetchPlacements?.()
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
            onDirtyChange={setIsDirty}
          />
        ))}

        <button
          onClick={handleAddClick}
          className="w-[181px] h-28 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-sm"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 실제 모달 렌더링 */}
      {isModalOpen &&
        (itemType === 'keyboard' ? (
          <KeyboardModal onClose={handleCloseModal} />
        ) : (
          <DeskModal onClose={handleCloseModal} />
        ))}

      {/* 로그인 안내 모달 */}
      {showLoginModal && (
        <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

export default ItemGrid