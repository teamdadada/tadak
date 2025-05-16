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

interface ReviewSectionProps {
  product: ProductDetailBase
}

const ReviewSection = ({ product }: ReviewSectionProps) => {
  const navigate = useNavigate()

  const { data: reviewList } = useReviewList(product.productId)
  const { data: reviewScore } = useReviewScore(product.productId)

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
          className="ml-auto text-sm font-medium transition bg-tadak-white hover:bg-tadak-white shadow-none text-tadak-black px-4 gap-1 flex items-center hover:font-bold"
          onClick={() => {
            sessionStorage.setItem('reviewProduct', JSON.stringify(product))
            navigate(`/product/${product.productId}/review/write`)
          }}
        >
          <PencilLine className="w-4 h-4" />
          작성하기
        </Button>

        <div className="absolute bottom-0 rounded z-1 bg-tadak-primary h-[2px] w-[88px]" />
      </div>

      <div className="px-8 py-2">
        {reviewCount > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-6 bg-tadak-light-gray/50 p-4 rounded-lg">
            <div className="flex flex-col items-center text-center sm:w-1/2">
              <span className="text-xs font-medium text-tadak-dark-gray mb-1">
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

            <div className="hidden sm:block h-20 w-px bg-tadak-gray/30 self-center"></div>

            <div className="flex flex-col items-center text-center sm:w-1/2">
              <span className="text-xs font-medium text-tadak-dark-gray mb-1">
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
              <MessageSquarePlus className="w-12 h-12 text-tadak-gray mb-2" />
              <p className="text-sm text-tadak-dark-gray mb-4">
                아직 작성된 리뷰가 없어요
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
              className="text-sm text-tadak-black font-bold bg-tadak-white hover:bg-tadak-white hover:underline shadow-none"
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
