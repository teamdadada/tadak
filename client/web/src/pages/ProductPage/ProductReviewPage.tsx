import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import ReviewItem from '@/components/review/ReviewItem'
import { useReviewList, useReviewScore } from '@/hooks/useReview'
import { ProductDetailBase } from '@/types/product'
import { useLocation } from 'react-router-dom'

const ProductReviewPage = () => {
  const { state } = useLocation()
  const product = state?.product as ProductDetailBase | undefined

  const productId = product?.productId ?? 10

  const { data: reviewList } = useReviewList(productId)
  const { data: reviewScore } = useReviewScore(productId)

  const reviews = reviewList?.reviews ?? []
  const reviewCount = reviewList?.count
  const averageScore = reviewScore?.isExist ? reviewScore.totalScore : 0

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* 제품 요약 */}
      {product && <ProductPreviewCard product={product} />}

      {/* 리뷰 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">전체 리뷰</h2>
        <p className="text-sm text-tadak-dark-gray">
          평균 {averageScore.toFixed(1)}점 · 총 {reviewCount}개
        </p>
      </div>

      {/* 리뷰 리스트 */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem
            key={review.reviewId}
            review={review}
            productId={productId}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductReviewPage
