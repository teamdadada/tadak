import { Product } from '@/types/shop'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAddZzim, useDeleteZzim } from '@/hooks/useZzim'
import { useUserStore } from '@/store/userStore'
import { useEffect, useState } from 'react'

interface ItemCardProps extends Product {
  size?: 'sm' | 'md' | 'lg'
  onZzimChange?: (productId: number, isLiked: boolean) => void
}

const ItemCard = ({
  productId,
  name,
  minPrice,
  thumbnail,
  type,
  onZzimChange,
}: ItemCardProps) => {
  const navigate = useNavigate()

  // const isZzimItem = useUserStore((state) => state.isZzimItem)
  const [isLiked, setIsLiked] = useState(false)
  const zzimList = useUserStore((state) => state.zzimList)

  useEffect(() => {
    const liked = zzimList.some((item) => item.item.productId === productId)
    setIsLiked(liked)
  }, [zzimList, productId, isLiked])

  const addZzim = useAddZzim()
  const deleteZzim = useDeleteZzim()

  const handleZzimClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      if (isLiked) {
        await deleteZzim(productId)
      } else {
        await addZzim(productId)
      }

      if (onZzimChange) {
        onZzimChange(productId, !isLiked)
      }
    } catch {
      // 에러 처리 로직
    }
  }

  return (
    <div
      onClick={() => {
        if (type) navigate(`/product/${type}/${productId}`)
      }}
      className="w-full rounded-lg p-5 flex flex-col justify-between items-center relative bg-tadak-white cursor-pointer"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div
          className="absolute p-1 rounded-lg top-2 right-2 cursor-pointer"
          onClick={handleZzimClick}
        >
          {isLiked ? (
            <FaHeart className="w-5 h-5 text-tadak-warning drop-shadow-md " />
          ) : (
            <FaRegHeart className="w-5 h-5 text-tadak-white drop-shadow-md" />
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full h-16 mt-4 text-left">
        <div className="text-[15px] ">{name}</div>
        <div className="mt-1 text-[15px] font-semibold">
          {minPrice !== undefined
            ? `${minPrice.toLocaleString()}원`
            : '가격 정보 없음'}
        </div>
      </div>
    </div>
  )
}

export default ItemCard
