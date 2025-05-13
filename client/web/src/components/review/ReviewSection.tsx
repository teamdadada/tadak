import ReviewItem from './ReviewItem'

const ReviewSection = () => {
  const exampleReviews = {
    count: 3,
    reviews: [
      {
        reviewId: 101,
        productId: 1001,
        content: '내 최애 스위치! 조용해서 사무실에서 사용하기 좋아요 :)',
        score: 5,
        images: [
          'https://cataas.com/cat/says/Good?1',
          'https://cataas.com/cat/says/Nice?2',
        ],
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
    ],
  }

  return (
    <section className="mt-2">
      <div className="relative flex items-center justify-between border-b border-tadak-gray">
        <h2 className="py-2 w-[88px] text-xl font-semibold text-center">
          상품평
        </h2>
        <button className="px-2 py-2 ml-auto mr-4 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white">
          작성하기
        </button>

        <div className="absolute bottom-0 rounded z-1 bg-tadak-primary h-[2px] w-[88px]" />
      </div>

      <div className="mt-4 space-y-4">
        {exampleReviews.reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </section>
  )
}

export default ReviewSection
