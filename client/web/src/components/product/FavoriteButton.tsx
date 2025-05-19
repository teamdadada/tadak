import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useUserStore } from '@/store/userStore'
import { useAddZzim, useDeleteZzim } from '@/hooks/useZzim'
import { motion } from 'framer-motion'
import LoginRequiredModal from '../common/LoginRequiredModal'

interface FavoriteButtonProps {
  productId: number
  onZzimChange?: (productId: number, isLiked: boolean) => void
}

const FavoriteButton = ({ productId, onZzimChange }: FavoriteButtonProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const zzimList = useUserStore((state) => state.zzimList)

  const addZzim = useAddZzim()
  const deleteZzim = useDeleteZzim()

  // 하트 애니메이션 상태
  const [isAnimating, setIsAnimating] = useState(false)

  // 로그인
  const [showLoginModal, setShowLoginModal] = useState(false)
  const isLoggedIn = useUserStore((state) => state.getIsLoggedIn())

  useEffect(() => {
    if (!isLoggedIn) return

    const liked = zzimList.some((item) => item.item.productId === productId)
    setIsLiked(liked)
  }, [zzimList, productId, isLiked, isLoggedIn])

  const handleZzimClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isLoggedIn) {
      setShowLoginModal(true) // 로그인 안내 모달
      return
    }

    // 하트 애니메이션 트리거
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

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
    <>
      <Button
        className="w-full px-10 py-5 shadow-none bg-tadak-white border-tadak-gray text-tadak-black border rounded-none hover:bg-tadak-white hover:border-tadak-black"
        onClick={handleZzimClick}
      >
        <motion.div
          onClick={handleZzimClick}
          animate={isAnimating ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isLiked ? (
            <FaHeart className="w-5 h-5 text-tadak-warning" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-tadak-black" />
          )}
        </motion.div>
        찜하기
      </Button>
      {/* 로그인 안내 모달 */}
      {showLoginModal && (
        <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

export default FavoriteButton
