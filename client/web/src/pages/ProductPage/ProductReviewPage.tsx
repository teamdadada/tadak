import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import ReviewItem from '@/components/review/ReviewItem'
import { ProductDetailBase } from '@/types/product'
import { useLocation } from 'react-router-dom'

const exampleReviews = {
  count: 4,
  reviews: [
    {
      reviewId: 101,
      productId: 1001,
      content: '내 최애 스위치! 조용해서 사무실에서 사용하기 좋아요 :)',
      score: 5,
      images: ['https://cataas.com/cat?1', 'https://cataas.com/cat?2'],
      author: {
        id: 1,
        name: '타덕',
        profileImg: 'https://cataas.com/cat?1',
      },
    },
    {
      reviewId: 102,
      productId: 1001,
      content: '부드럽게 눌리고 반응이 빠릅니다. 추천해요!',
      score: 4,
      images: [],
      author: {
        id: 2,
        name: '고양이사랑',
        profileImg: 'https://cataas.com/cat?2',
      },
    },
    {
      reviewId: 103,
      productId: 1001,
      content: '생각보다 소리가 크네요. 그래도 만족합니다!',
      score: 3,
      images: [],
      author: {
        id: 3,
        name: '타닥타닥러버',
        profileImg: 'https://cataas.com/cat?3',
      },
    },
    {
      reviewId: 104,
      productId: 1001,
      content: '키압이 살짝 있는 편인데 오타율이 줄어서 좋아요.',
      score: 4,
      images: ['https://cataas.com/cat/says/Solid?4'],
      author: {
        id: 4,
        name: '리뷰봇',
        profileImg: 'https://cataas.com/cat?4',
      },
    },
  ],
}

const ProductReviewPage = () => {
  const { state } = useLocation()
  const product = state?.product as ProductDetailBase | undefined

  const reviewCount = exampleReviews.count
  const totalScore = exampleReviews.reviews.reduce((sum, r) => sum + r.score, 0)
  const averageScore = totalScore / reviewCount

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
        {exampleReviews.reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  )
}

export default ProductReviewPage
