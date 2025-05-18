import { useNavigate } from 'react-router-dom'
import ReviewItem from './ReviewItem'
import { ProductDetailBase } from '@/types/product'
import { Button } from '../ui/button'
import { useReviewList, useReviewScore } from '@/hooks/useReview'
import {
  PencilLine,
  MessageSquarePlus,
  MessagesSquare,
  ChevronRight,
} from 'lucide-react'
import { renderStars } from '@/utils/renderStarts'
import { useQueryClient } from '@tanstack/react-query'
import { getMyReviews } from '@/services/reviewService'
import { toast } from 'sonner'

interface ReviewSectionProps {
  product: ProductDetailBase
}

const ReviewSection = ({ product }: ReviewSectionProps) => {
  const navigate = useNavigate()

  const { data: reviewList } = useReviewList(product.productId)
  const { data: reviewScore } = useReviewScore(product.productId)

  const queryClient = useQueryClient()
  const handleWriteClick = async () => {
    const { reviews } = await queryClient.fetchQuery({
      queryKey: ['myReviews'],
      queryFn: getMyReviews,
    })

    const hasReviewed = reviews.some(
      (review) => review.product.productId === product.productId,
    )

    if (hasReviewed) {
      toast.warning('이미 리뷰를 작성한 제품입니다.')
      return
    }

    sessionStorage.setItem('reviewProduct', JSON.stringify(product))
    navigate(`/product/${product.productId}/review/write`)
  }

  const reviewCount = reviewList?.count ?? 0
  const averageScore =
    reviewScore && reviewScore.isExist ? reviewScore.totalScore : 0
  const reviews = reviewList?.reviews ?? []

  return (
    <section className="mt-2 bg-white ">
      {/* 헤더 */}
      <div className="relative flex items-center justify-between border-b border-tadak-gray">
        <h2 className="py-2 w-[88px] text-xl font-semibold text-center">
          상품평
        </h2>

        <Button
          className="flex items-center gap-1 px-4 ml-auto text-sm font-medium transition shadow-none bg-tadak-white hover:bg-tadak-white text-tadak-black hover:font-bold"
          onClick={handleWriteClick}
        >
          <PencilLine className="w-4 h-4" />
          작성하기
        </Button>

        <div className="absolute bottom-0 rounded z-1 bg-tadak-primary h-[2px] w-[88px]" />
      </div>

      <div className="px-8 py-2">
        {reviewCount > 0 && (
          <div className="flex flex-col gap-4 p-4 mt-4 mb-6 rounded-lg sm:flex-row bg-tadak-light-gray/50">
            <div className="flex flex-col items-center text-center sm:w-1/2">
              <span className="mb-1 text-xs font-medium text-tadak-dark-gray">
                평균 평점
              </span>
              {renderStars(averageScore)}
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-tadak-black">
                  {averageScore.toFixed(1)}
                </span>
                <span className="text-sm text-tadak-dark-gray">/ 5.0</span>
              </div>
            </div>

            <div className="self-center hidden w-px h-20 sm:block bg-tadak-gray/30"></div>

            <div className="flex flex-col items-center text-center sm:w-1/2">
              <span className="mb-1 text-xs font-medium text-tadak-dark-gray">
                전체 리뷰 수
              </span>
              <MessagesSquare className="w-8 h-8 text-tadak-gray" />
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-tadak-black">
                  {reviewCount}
                </span>
                <span className="text-sm text-tadak-dark-gray">개</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-6">
          {reviewCount === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <MessageSquarePlus className="w-16 h-16 text-tadak-gray/50 mb-4" />
              <p className="text-sm text-tadak-dark-gray mb-4">
                아직 작성된 리뷰가 없습니다
              </p>
            </div>
          ) : (
            <div className="divide-y divide-tadak-gray/20">
              {reviews.slice(0, 3).map((review, index) => (
                <div
                  key={review.reviewId}
                  className={`pt-4 ${index > 0 ? 'pt-6' : ''} pb-4`}
                >
                  <ReviewItem review={review} productId={product.productId} />
                </div>
              ))}
            </div>
          )}
        </div>

        {reviewCount > 3 && (
          <div className="flex justify-end">
            <Button
              className="text-sm font-bold shadow-none text-tadak-black bg-tadak-white hover:bg-tadak-white hover:underline"
              onClick={() =>
                navigate(`/product/${product.productId}/reviews`, {
                  state: { product },
                })
              }
            >
              리뷰 {reviewCount}개 전체 보기
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ReviewSection
