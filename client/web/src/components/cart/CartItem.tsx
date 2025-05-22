import { cartItem } from '@/types/cart'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

interface CartItemProps {
  cartItem: cartItem
  onClick: () => void
  checked: boolean
  onCheckToggle: () => void
}

const CartItem = ({
  cartItem,
  onClick,
  checked,
  onCheckToggle,
}: CartItemProps) => {
  // 이미지 로딩 상태
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <div className="relative flex flex-col items-center justify-between w-full p-5 transition rounded-lg cursor-pointer bg-tadak-white hover:shadow-md">
      {/* 체크박스 위치 */}
      <div className="absolute z-10 top-3 left-3">
        <Checkbox checked={checked} onCheckedChange={onCheckToggle} />
      </div>

      <div
        className="relative flex flex-col items-center justify-between w-full rounded-lg cursor-pointer bg-tadak-white"
        onClick={onClick}
      >
        <div className="relative w-full rounded-md">
          {/* 이미지 로딩 스켈레톤 */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-tadak-gray animate-spin" />
            </div>
          )}

          {/* 이미지 로드 실패 시 */}
          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 text-tadak-gray"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <p className="text-xs text-tadak-gray">
                이미지를 불러올 수 없습니다
              </p>
            </div>
          )}

          {/* 상품 이미지 */}
          <img
            src={cartItem.thumbnailUrl}
            alt={cartItem.keyboardName}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className="flex flex-col justify-center w-full h-16 mt-4 text-left">
          <div className="text-[15px] truncate">{cartItem.keyboardName}</div>
          <div className="mt-1 text-[15px] font-semibold">
            {cartItem.totalPrice !== undefined && cartItem.totalPrice !== null
              ? `${cartItem.totalPrice.toLocaleString()}원`
              : '가격 정보 없음'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
