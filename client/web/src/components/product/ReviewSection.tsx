import ReviewItem from './ReviewItem'

const ReviewSection = () => {
  const exampleReviews = [
    {
      userId: 1,
      userImage: `https://cataas.com/cat?1`,
      userName: '타덕',
      rating: 5,
      text: '내 최애 스위치! 조용해서 사무실에서 사용하기 좋아요 :)',
    },
    {
      userId: 2,
      userImage: `https://cataas.com/cat?2`,
      userName: '고양이사랑',
      rating: 4,
      text: '부드럽게 눌리고 반응이 빠릅니다. 추천해요!',
    },
    {
      userId: 3,
      userImage: `https://cataas.com/cat?3`,
      userName: '타닥타닥러버',
      rating: 3,
      text: '생각보다 소리가 크네요. 그래도 만족합니다!',
    },
  ]

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
        {exampleReviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </section>
  )
}

export default ReviewSection
