import { cn } from '@/lib/utils'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface ItemCardProps {
  name: string
  price: number
  imageUrl: string
  liked?: boolean
  className?: string
}

interface ItemCardProps {
  name: string
  price: number
  imageUrl: string
  liked?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-[150px] h-[200px] text-sm',
  md: 'w-[250px] h-[330px] text-base',
  lg: 'w-[300px] h-[360px] text-lg',
}

const ItemCard = ({
  name,
  price,
  imageUrl,
  liked = true,
  size = 'md', // 기본은 중간 크기
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        'border rounded-lg p-4 flex flex-col justify-between items-center relative bg-white',
        sizeClasses[size],
      )}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-md">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
        <div className="absolute p-1 rounded-lg top-2 right-2 bg-tadak-white/80">
          {liked ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full h-16 mt-4 text-left">
        <div className="font-semibold">{name}</div>
        <div className="mt-1">{price.toLocaleString()}원</div>
      </div>
    </div>
  )
}

export default ItemCard
