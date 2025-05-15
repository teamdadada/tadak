// src/components/customKeyboard/ItemCard.tsx
import { ReactComponent as DropdownIcon } from '@/assets/icons/dropdown.svg'
import { ReactComponent as DropupIcon } from '@/assets/icons/dropup.svg'
import ItemDropdown from './ItemDropdown'

interface Item {
  id: number
  name: string
  imageUrl: string
}

interface ItemCardProps {
  item: Item
  itemType: 'keyboard' | 'desk'
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const ItemCard = ({ item, itemType, isOpen, onOpenChange }: ItemCardProps) => {
  return (
    <div
      className={`relative w-[181px] h-28 rounded-sm p-1 bg-white hover:shadow-sm box-border ${
        isOpen ? 'border border-tadak-secondary' : 'border'
      }`}
    >
      {/* 이미지 */}
      <div className="flex items-center justify-center h-full pt-2 pb-6 px-2">
        <img
          src={item.imageUrl}
          alt={item.name || '이미지'}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* 이름 + 드롭다운 */}
      <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-sm text-tadak-dark-gray font-medium">
        <div className="truncate">{item.name || '\u00A0'}</div> {/* 공백 유지용 */}
        <ItemDropdown
          itemId={item.id}
          itemType={itemType}
          open={isOpen}
          onOpenChange={onOpenChange}
        >
          {isOpen ? (
            <DropupIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
          ) : (
            <DropdownIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
          )}
        </ItemDropdown>
      </div>
    </div>
  )
}

export default ItemCard