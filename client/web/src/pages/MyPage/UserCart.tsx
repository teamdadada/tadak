import CartItem from '@/components/cart/CartItem'
import DeleteCart from '@/components/cart/DeleteCart'
import KeyboardDetailModal from '@/components/cart/KeyboardDetailModal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { getCart } from '@/services/cartService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const UserCart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cartList'],
    queryFn: getCart,
  })

  const [selectedKeyboardId, setSelectedKeyboardId] = useState<number | null>(
    null,
  )
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenDetail = (keyboardId: number) => {
    setSelectedKeyboardId(keyboardId)
    setModalOpen(true)
  }

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleSelect = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === data?.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(data ? data.map((item) => item.itemId) : [])
    }
  }

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>장바구니 불러오기에 실패했어요 🥲</div>

  return (
    <>
      <div className="p-4">
        {data?.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-tadak-dark-gray">
            아직 장바구니에 담은 상품이 없습니다.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  checked={selectedItems.length === data?.length}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm">전체 선택</span>
              </div>

              <Button
                onClick={() => setShowDeleteModal(true)}
                className="px-3 py-1 ml-2 text-sm text-white rounded bg-tadak-warning hover:bg-red-500"
              >
                삭제
              </Button>
              {showDeleteModal && (
                <DeleteCart
                  keyboardIdList={selectedItems}
                  onClose={() => setShowDeleteModal(false)}
                />
              )}
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {data?.map((item) => (
                <CartItem
                  key={item.itemId}
                  cartItem={item}
                  onClick={() => handleOpenDetail(item.keyboardId)}
                  checked={selectedItems.includes(item.itemId)}
                  onCheckToggle={() => toggleSelect(item.itemId)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {modalOpen && selectedKeyboardId && (
        <KeyboardDetailModal
          keyboardId={selectedKeyboardId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default UserCart
