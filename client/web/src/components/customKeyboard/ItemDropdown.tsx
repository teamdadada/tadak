// src/components/customKeyboard/ItemDropdown.tsx
import { ReactNode } from 'react'
import { ReactComponent as DeskIcon } from '@/assets/icons/desk.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '@/assets/icons/delete.svg'

interface ItemDropdownProps {
  itemId: number
  itemType: 'keyboard' | 'desk'
  children: ReactNode
  open: boolean
  onOpenChange: (value: boolean) => void
}

const ItemDropdown = ({
  itemId,
  itemType,
  children,
  open,
  onOpenChange,
}: ItemDropdownProps) => {
  const toggleDropdown = () => onOpenChange(!open)

  const handleAction = (action: string) => {
    console.log(`Action "${action}" on item #${itemId}`)
    onOpenChange(false)
  }

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div className="absolute z-50 mt-2 right-[-9px] w-[181px] rounded-md bg-white shadow border p-2 space-y-2">
          {itemType === 'keyboard' ? (
            <>
              <DropdownItem
                icon={<DeskIcon />}
                text="내 데스크에 배치"
                onClick={() => handleAction('place')}
              />
              <DropdownItem
                icon={<CartIcon />}
                text="장바구니 담기"
                onClick={() => handleAction('cart')}
              />
              <DropdownItem
                icon={<EditIcon />}
                text="수정"
                onClick={() => handleAction('edit')}
              />
              <DropdownItem
                icon={<DeleteIcon />}
                text="삭제"
                onClick={() => handleAction('delete')}
              />
            </>
          ) : (
            <>
              <DropdownItem
                icon={<DeskIcon />}
                text="내 데스크에 설정"
                onClick={() => handleAction('set')}
              />
              <DropdownItem
                icon={<DeleteIcon />}
                text="삭제"
                onClick={() => handleAction('delete')}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  icon: ReactNode
  text: string
  onClick: () => void
}

const DropdownItem = ({ icon, text, onClick }: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-tadak-dark-gray rounded-md border border-gray-200 hover:bg-gray-100"
    >
      <span className="w-4 h-4">{icon}</span>
      {text}
    </button>
  )
}

export default ItemDropdown