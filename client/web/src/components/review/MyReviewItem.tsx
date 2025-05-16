import { Review } from '@/types/review'
import ReviewDeleteDialog from './ReviewDeleteDialog'
import { renderStars } from '@/utils/renderStarts'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

interface ReviewItemProps {
  review: Review
  productId: number
}

const ReviewItem = ({ review, productId }: ReviewItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleImageCount, setVisibleImageCount] = useState(6)

  useEffect(() => {
    const calculateVisibleImages = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      const imageWidth = 84 // w-20 + gap 고려
      const maxImages = Math.floor(containerWidth / imageWidth)
      setVisibleImageCount(Math.max(1, Math.min(maxImages, 12)))
    }

    calculateVisibleImages()
    window.addEventListener('resize', calculateVisibleImages)
    return () => window.removeEventListener('resize', calculateVisibleImages)
  }, [])

  // 이미지 로딩 상태 관리
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

  const [showImages, setShowImages] = useState(false)
  const toggleImages = () => {
    setShowImages((prev) => !prev)
  }

  const { content, score, images, reviewId } = review

  // 이미지 로드 완료 핸들러
  const handleImageLoad = (idx: number) => {
    setImageLoaded((prev) => ({ ...prev, [idx]: true }))
  }

  // 이미지 렌더링 함수
  const renderImages = (images: string[]) => {
    if (images.length === 0) return null

    // 표시할 이미지 수 계산
    const displayCount = Math.min(images.length, visibleImageCount)

    return (
      <div
        ref={containerRef}
        className="grid gap-1 py-2 pb-3"
        style={{
          gridTemplateColumns: `repeat(${displayCount}, minmax(0, 1fr))`,
        }}
      >
        {images.map((imgUrl, idx) => (
          <div key={idx} className="relative flex-shrink-0 w-20 h-20">
            {/* 이미지 로딩 플레이스홀더 */}
            <div
              className={`absolute inset-0 bg-tadak-light-gray/70 border border-tadak-light-gray ${imageLoaded[idx] ? 'hidden' : 'block'}`}
            ></div>

            {/* 실제 이미지 */}
            <img
              src={imgUrl}
              alt={`리뷰 이미지 ${idx + 1}`}
              className={`object-cover w-full h-full border border-tadak-light-gray ${imageLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(idx)}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 min-h-[120px]">
      {/* 상단: 별점 및 삭제 버튼 */}
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="flex items-center mt-1">{renderStars(score)}</div>
        </div>

        <div className="flex items-center">
          <ReviewDeleteDialog reviewId={reviewId} productId={productId} />
        </div>
      </div>
      {/* 리뷰 내용 */}
      <div className="mt-2 text-sm whitespace-pre-line text-tadak-black">
        {content}
      </div>
      {/* 이미지 슬라이드 */}
      {images.length > 0 && (
        <Button
          variant="ghost"
          onClick={toggleImages}
          className="self-start px-0 py-2 text-xs bg-tadak-white text-tadak-secondary hover:bg-tadak-white hover:text-tadak-secondary hover:underline focus:outline-none"
        >
          {showImages ? '이미지 숨기기' : '이미지 보기'}
        </Button>
      )}{' '}
      {showImages && renderImages(images)}
    </div>
  )
}

export default ReviewItem
