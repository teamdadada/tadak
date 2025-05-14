import { useNavigate } from 'react-router-dom'
import ReviewItem from './ReviewItem'
import { ProductDetailBase } from '@/types/product'
import { Button } from '../ui/button'

interface ReviewSectionProps {
  product: ProductDetailBase
}

const ReviewSection = ({ product }: ReviewSectionProps) => {
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

  const navigate = useNavigate()

  const totalScore = exampleReviews.reviews.reduce(
    (sum, review) => sum + review.score,
    0,
  )
  const reviewCount = exampleReviews.count
  const averageScore = totalScore / reviewCount

  return (
    <section className="mt-2">
      <div className="relative flex items-center justify-between border-b border-tadak-gray">
        <h2 className="py-2 w-[88px] text-xl font-semibold text-center">
          상품평
        </h2>
        <Button
          variant="outline"
          className="px-2 py-2 ml-auto mr-4 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white"
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
          exampleReviews.reviews
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
