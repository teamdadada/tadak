import ProductSummaryItem from '@/components/product/ProductSummaryItem'
import ReviewItem from '@/components/review/ReviewItem'
import { getMyReviews } from '@/services/reviewService'
import { useQuery } from '@tanstack/react-query'

const UserReview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError || !data) return <p>에러 발생</p>

  return (
    <div className="flex flex-col gap-6">
      {data?.reviews.map((review) => (
        <div className="flex flex-col gap-2 border-b border-tadak-light-gray">
          <ProductSummaryItem
            name={review.product.name}
            thumbnail={review.product.thumbnail}
          />
          <ReviewItem
            key={review.reviewId}
            review={review}
            productId={review.product.productId}
          />
        </div>
      ))}
    </div>
  )
}

export default UserReview
