interface ReviewItemProps {
  review: {
    userId: number
    userImage: string
    userName: string
    rating: number
    text: string
  }
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { userId, userImage, userName, rating, text } = review
  const me = 1

  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <div className="flex flex-row">
        <img
          src={userImage}
          alt="User Profile"
          className="object-cover w-12 h-12 rounded-full"
        />

        <div className="flex-1 px-4">
          <p className="text-sm font-medium">{userName}</p>
          <div className="flex items-center mt-1">
            {/* 별점 */}
            <div className="flex text-yellow-500">
              {'★'.repeat(rating)}
              {'☆'.repeat(5 - rating)}
            </div>
          </div>
        </div>

        {/* 수정 및 삭제 버튼 */}
        {me === userId && (
          <div className="mt-2 space-x-2">
            <button className="px-2 py-1 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white">
              수정
            </button>
            <button className="px-2 py-1 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white">
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="mt-1 ml-2 text-sm text-tadak-black">{text}</div>
    </div>
  )
}

export default ReviewItem
