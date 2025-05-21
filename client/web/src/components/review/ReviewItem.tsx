import { Review } from '@/types/review'
import ReviewDeleteDialog from './ReviewDeleteDialog'
import { useUserStore } from '@/store/userStore'
import { renderStars } from '@/utils/renderStarts'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ReviewItemProps {
  review: Review
  productId: number
}

const ReviewItem = ({ review, productId }: ReviewItemProps) => {
  const userStore = useUserStore()
  const me = userStore.getUserUuid()
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleImageCount, setVisibleImageCount] = useState(6)
  const [showAllImages, setShowAllImages] = useState(false)

  // 이미지 모달 관련 상태
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentImageIdx, setCurrentImageIdx] = useState(0)

  // 이미지 로딩 상태 관리
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

  const { author, content, score, images, reviewId } = review
  const { id, name, profileImg } = author

  // 화면 크기에 따라 표시할 이미지 수 계산
  useEffect(() => {
    const calculateVisibleImages = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const imageWidth = 100 // 이미지 너비(20) + 간격(2) × 2

      // 컨테이너에 들어갈 수 있는 최대 이미지 수 계산
      const maxImages = Math.floor(containerWidth / imageWidth)

      // 최소 1개, 최대 12개까지 표시
      setVisibleImageCount(Math.max(1, Math.min(maxImages, 10)))
    }

    // 초기 계산
    calculateVisibleImages()

    // 윈도우 크기 변경 시 다시 계산
    const handleResize = () => calculateVisibleImages()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 이미지 로드 완료 핸들러
  const handleImageLoad = (idx: number) => {
    setImageLoaded((prev) => ({ ...prev, [idx]: true }))
  }

  // 이미지 클릭 핸들러 - 모달 열기
  const handleImageClick = (idx: number) => {
    setCurrentImageIdx(idx)
    setShowImageModal(true)
  }

  // 모달에서 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % images.length)
  }

  // 모달에서 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  // 키보드 네비게이션 (좌우 화살표, ESC 키)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showImageModal) return

      switch (e.key) {
        case 'ArrowRight':
          handleNextImage()
          break
        case 'ArrowLeft':
          handlePrevImage()
          break
        case 'Escape':
          setShowImageModal(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showImageModal, images.length])

  // 이미지 렌더링 함수
  const renderImages = (images: string[]) => {
    if (images.length === 0) return null

    // 표시할 이미지 수 계산
    const displayCount = showAllImages
      ? images.length
      : Math.min(images.length, visibleImageCount)

    const hasMore = images.length > visibleImageCount

    return (
      <div
        ref={containerRef}
        className="grid gap-6 py-2 pb-3"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(80px, 1fr))`,
        }}
      >
        {images.slice(0, displayCount).map((imgUrl, idx) => (
          <div key={idx} className="relative w-24 h-24">
            {/* 이미지 로딩 플레이스홀더 */}
            <div
              className={`absolute inset-0 bg-tadak-light-gray/70 border border-tadak-light-gray ${
                imageLoaded[idx] ? 'hidden' : 'block'
              }`}
            ></div>

            {/* 실제 이미지 */}
            <img
              src={imgUrl}
              alt={`리뷰 이미지 ${idx + 1}`}
              className={`object-cover w-full h-full border border-tadak-light-gray cursor-pointer hover:opacity-80 transition ${imageLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(idx)}
              onClick={() => handleImageClick(idx)}
            />

            {/* 마지막 이미지에 +N 표시 */}
            {!showAllImages && idx === visibleImageCount - 1 && hasMore && (
              <button
                onClick={() => setShowAllImages(true)}
                className="absolute top-0 right-0 z-10 p-1 text-xs font-medium text-tadak-white bg-tadak-black/70"
              >
                +{images.length - visibleImageCount}
              </button>
            )}
          </div>
        ))}

        {/* 접기 버튼 */}
        {showAllImages && hasMore && (
          <button
            onClick={() => setShowAllImages(false)}
            className="flex items-center justify-center flex-shrink-0 w-20 h-20 text-xs border rounded border-tadak-light-gray text-tadak-gray hover:bg-tadak-light-gray/50"
          >
            접기
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 min-h-[120px]">
      {/* 상단: 프로필 및 정보 */}
      <div className="flex items-start justify-between">
        {/* 왼쪽: 프로필 이미지, 이름, 별점 */}
        <div className="flex items-start">
          <img
            src={profileImg}
            alt="User Profile"
            className="object-cover rounded-full w-14 h-14"
          />

          <div className="flex flex-col px-3">
            <p className="text-sm font-medium">{name}</p>
            <div className="flex items-center mt-1">{renderStars(score)}</div>
          </div>
        </div>

        {/* 오른쪽: 수정/삭제 버튼 */}
        {me === id && (
          <div className="flex items-center">
            <ReviewDeleteDialog reviewId={reviewId} productId={productId} />
          </div>
        )}
      </div>

      {/* 리뷰 내용 */}
      <div
        className="pl-2 mt-2 text-sm whitespace-pre-line text-tadak-black"
        style={{
          overflowWrap: 'break-word',
        }}
      >
        {content}
      </div>

      {/* 이미지 슬라이드 */}
      {images.length > 0 && renderImages(images)}

      {/* 이미지 모달 */}
      {showImageModal && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 이미지 */}
            <img
              src={images[currentImageIdx]}
              alt={`리뷰 이미지 확대 ${currentImageIdx + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* 이미지 카운터 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIdx + 1} / {images.length}
            </div>

            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>

            {/* 이전 버튼 */}
            {images.length > 1 && (
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
              >
                <ChevronLeft />
              </button>
            )}

            {/* 다음 버튼 */}
            {images.length > 1 && (
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewItem
