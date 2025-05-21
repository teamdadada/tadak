import CartItem from '@/components/cart/cartItem'
import { getCart } from '@/services/cartService'
import { useQuery } from '@tanstack/react-query'

const UserCart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cartList'],
    queryFn: getCart,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>장바구니 불러오기에 실패했어요 🥲</div>

  return (
    <div className="p-4">
      {data?.length === 0 ? (
        <p>장바구니가 비어 있어요.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {data?.map((item) => <CartItem key={item.itemId} {...item} />)}
        </div>
      )}
    </div>
  )
}

export default UserCart
