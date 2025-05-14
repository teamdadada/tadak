import { cn } from '@/lib/utils'
import { Product } from '@/types/shop'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface ItemCardProps extends Product {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-[150px] h-[200px] text-sm',
  md: 'w-[250px] h-[330px] text-base',
  lg: 'w-[300px] h-[360px] text-lg',
}

const ItemCard = ({
  productId,
  name,
  minPrice,
  thumbnail,
  type,
  liked = false,
  size = 'md', // 기본은 중간 크기
}: ItemCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        if (type) navigate(`/product/${type}/${productId}`)
      }}
      className={cn(
        'rounded-lg p-5 flex flex-col justify-between items-center relative bg-tadak-white cursor-pointer',
        sizeClasses[size],
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden ">
        <img
          src={thumbnail}
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute p-1 rounded-lg top-2 right-2">
          {liked ? (
            <FaHeart className="w-5 h-5 text-tadak-warning" />
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
