import { useNavigate } from 'react-router-dom'
import ReviewItem from './ReviewItem'
import { ProductDetailBase } from '@/types/product'
import { Button } from '../ui/button'
import { useReviewList, useReviewScore } from '@/hooks/useReview'

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
    <section className="mt-2">
      <div className="relative flex items-center justify-between border-b border-tadak-gray">
        <h2 className="py-2 w-[88px] text-xl font-semibold text-center">
          상품평
        </h2>
        <Button
          variant="outline"
          className="px-2 py-2 ml-auto mr-4 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-tadak-white"
          onClick={() =>
            navigate(`/product/${product.productId}/review/write`, {
              state: { product },
            })
          }
        >
          작성하기
        </Button>

        <div className="absolute bottom-0 rounded z-1 bg-tadak-primary h-[2px] w-[88px]" />
      </div>

      {reviewCount > 0 && (
        <div className="flex items-end gap-2 mt-4 text-sm text-tadak-dark-gray">
          <span className="flex text-4xl leading-none text-tadak-primary">
            {'★'.repeat(Math.round(averageScore))}
            {'☆'.repeat(5 - Math.round(averageScore))}
          </span>
          <span className="text-lg font-semibold text-tadak-black">
            평균 {averageScore.toFixed(1)}점
          </span>
          <span className="text-tadak-dark-gray">· 리뷰 {reviewCount}개</span>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {reviewCount === 0 ? (
          <p className="text-sm text-tadak-dark-gray">
            아직 작성된 리뷰가 없어요 😢
          </p>
        ) : (
          reviews
            .slice(0, 3)
            .map((review) => (
              <ReviewItem key={review.reviewId} review={review} />
            ))
        )}
      </div>

      {reviewCount > 3 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() =>
              navigate(`/product/${product.productId}/reviews`, {
                state: { product },
              })
            }
            className="text-sm text-tadak-primary hover:underline"
          >
            리뷰 전체 보기 →
          </button>
        </div>
      )}
    </section>
  )
}

export default ReviewSection
