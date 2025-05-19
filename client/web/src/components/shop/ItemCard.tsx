import { Product } from '@/types/shop'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAddZzim, useDeleteZzim } from '@/hooks/useZzim'
import { useUserStore } from '@/store/userStore'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import LoginRequiredModal from '../common/LoginRequiredModal'

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

  // 이미지 로딩 상태
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // 찜 상태
  const [isLiked, setIsLiked] = useState(false)
  const zzimList = useUserStore((state) => state.zzimList)

  // 하트 애니메이션 상태
  const [isAnimating, setIsAnimating] = useState(false)

  // 로그인
  const [showLoginModal, setShowLoginModal] = useState(false)
  const isLoggedIn = useUserStore((state) => state.getIsLoggedIn())

  // 찜
  const addZzim = useAddZzim()
  const deleteZzim = useDeleteZzim()

  useEffect(() => {
    if (!isLoggedIn) return

    const liked = zzimList.some((item) => item.item.productId === productId)
    setIsLiked(liked)
  }, [zzimList, productId, isLoggedIn])

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

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <>
      <div
        onClick={() => {
          if (type) navigate(`/product/${type}/${productId}`)
        }}
        className="w-full rounded-lg p-5 flex flex-col justify-between items-center relative bg-tadak-white cursor-pointer"
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
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
                className="text-tadak-gray mb-2"
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
            src={thumbnail}
            alt={name}
            className={`object-cover w-full h-full transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* 하트 버튼 (애니메이션 적용) */}
          <motion.div
            className="absolute p-1 rounded-lg top-2 right-2 cursor-pointer z-2"
            onClick={handleZzimClick}
            animate={isAnimating ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {isLiked ? (
              <FaHeart className="w-5 h-5 text-tadak-warning drop-shadow-md" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-tadak-white drop-shadow-md" />
            )}
          </motion.div>
        </div>

        <div className="flex flex-col justify-center w-full h-16 mt-4 text-left">
          <div className="text-[15px] truncate">{name}</div>
          <div className="mt-1 text-[15px] font-semibold">
            {minPrice !== undefined && minPrice !== null
              ? `${minPrice.toLocaleString()}원`
              : '가격 정보 없음'}
          </div>
        </div>
      </div>
      {/* 로그인 안내 모달 */}
      {showLoginModal && (
        <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

export default ItemCard
