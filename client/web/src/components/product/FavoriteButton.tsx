import { useState } from 'react'
import { Button } from '../ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface FavoriteButtonProps {
  initialLiked?: boolean
  onToggle?: (liked: boolean) => void
}

const FavoriteButton = ({
  initialLiked = false,
  onToggle,
}: FavoriteButtonProps) => {
  const [liked, setLiked] = useState(initialLiked)

  const handToggle = () => {
    const nextLiked = !liked
    setLiked(nextLiked)

    onToggle?.(nextLiked)
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="border-tadak-primary text-tadak-black hover:bg-tadak-primary/10"
      onClick={handToggle}
    >
      {liked ? (
        <FaHeart className="w-5 h-5 mr-2 text-red-500" />
      ) : (
        <FaRegHeart className="w-5 h-5 mr-2 text-red-500" />
      )}
      찜하기
    </Button>
  )
}

export default FavoriteButton
