import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useUserStore } from '@/store/userStore'
import { useAddZzim, useDeleteZzim } from '@/hooks/useZzim'

interface FavoriteButtonProps {
  productId: number
  onZzimChange?: (productId: number, isLiked: boolean) => void
}

const FavoriteButton = ({ productId, onZzimChange }: FavoriteButtonProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const zzimList = useUserStore((state) => state.zzimList)

  const addZzim = useAddZzim()
  const deleteZzim = useDeleteZzim()

  useEffect(() => {
    const liked = zzimList.some((item) => item.item.productId === productId)
    setIsLiked(liked)
  }, [zzimList, productId, isLiked])

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
    <Button
      variant="outline"
      size="lg"
      className="border-tadak-primary text-tadak-black hover:bg-tadak-primary/10"
      onClick={handleZzimClick}
    >
      {isLiked ? (
        <FaHeart className="w-5 h-5 text-tadak-warning drop-shadow-md" />
      ) : (
        <FaRegHeart className="w-5 h-5 text-tadak-white drop-shadow-md" />
      )}
      찜하기
    </Button>
  )
}

export default FavoriteButton
