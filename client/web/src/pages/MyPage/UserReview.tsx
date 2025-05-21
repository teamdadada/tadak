import ProductSummaryItem from '@/components/product/ProductSummaryItem'
import MyReviewItem from '@/components/review/MyReviewItem'
import { useMyReviews } from '@/hooks/useReview'

const UserReview = () => {
  const { data, isLoading, isError } = useMyReviews()

  if (isLoading) return <div>로딩 중...</div>
  if (isError || !data) return <p>에러 발생</p>

  return (
    <div className="flex flex-col gap-6">
      {data.reviews.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-tadak-dark-gray">
          아직 작성한 리뷰가 없습니다.
        </div>
      ) : (
        data.reviews.map((review) => (
          <div
            key={review.reviewId}
            className="flex flex-col gap-2 px-2 py-2 border-b border-tadak-light-gray"
          >
            <ProductSummaryItem
              name={review.product?.name || '삭제된 상품'}
              thumbnail={review.product?.thumbnail}
            />
            <MyReviewItem
              review={review}
              productId={review.product?.productId}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default UserReview
