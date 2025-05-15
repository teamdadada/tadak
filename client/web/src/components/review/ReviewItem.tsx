import { Review } from '@/types/review'
import ReviewDeleteDialog from './ReviewDeleteDialog'
import { useUserStore } from '@/store/userStore'

interface ReviewItemProps {
  review: Review
  productId: number
}

const ReviewItem = ({ review, productId }: ReviewItemProps) => {
  const userSotre = useUserStore()
  const me = userSotre.getUserUuid()

  const { author, content, score, images, reviewId } = review
  const { id, name, profileImg } = author

  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <div className="flex flex-row">
        <img
          src={profileImg}
          alt="User Profile"
          className="object-cover w-12 h-12 rounded-full"
        />

        <div className="flex-1 px-4">
          <p className="text-sm font-medium">{name}</p>
          <div className="flex items-center mt-1">
            {/* 별점 */}
            <div className="flex text-yellow-500">
              {'★'.repeat(score)}
              {'☆'.repeat(5 - score)}
            </div>
          </div>
        </div>

        {/* 수정 및 삭제 버튼 */}
        {me === id && (
          <div className="mt-2 space-x-2">
            {/* <button className="px-2 py-1 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white">
              수정
            </button> */}
            <ReviewDeleteDialog reviewId={reviewId} productId={productId} />
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-2">
          {images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`리뷰 이미지 ${idx + 1}`}
              className="object-cover w-24 h-24 border rounded-md border-tadak-light-gray"
            />
          ))}
        </div>
      )}

      <div className="mt-1 ml-2 text-sm text-tadak-black">{content}</div>
    </div>
  )
}

export default ReviewItem
