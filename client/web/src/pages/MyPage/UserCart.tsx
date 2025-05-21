import CartItem from '@/components/cart/CartItem'
import KeyboardDetailModal from '@/components/cart/KeyboardDetailModal'
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {data?.map((item) => (
              <CartItem
                key={item.itemId}
                cartItem={item}
                onClick={() => handleOpenDetail(item.keyboardId)}
              />
            ))}
          </div>
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
