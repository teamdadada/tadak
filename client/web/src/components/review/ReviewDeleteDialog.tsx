import { X } from 'lucide-react'
import deleteDuck from '@/assets/images/delete.png'
import { deleteReview } from '@/services/reviewService'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

interface ReviewDeleteDialogProps {
  reviewId: number
  productId: number
}
const ReviewDeleteDialog = ({
  reviewId,
  productId,
}: ReviewDeleteDialogProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId)
      toast.success('리뷰가 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['reviewList', productId] })
      queryClient.invalidateQueries({ queryKey: ['myReviews'] })
      setOpen(false)
    } catch {
      toast.error('삭제에 실패했습니다.')
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 p-1 text-xs bg-transparent shadow-none text-tadak-gray hover:bg-transparent hover:underline"
      >
        삭제
        <Trash2 />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute text-gray-500 top-4 right-4 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="mt-4 mb-4 text-lg font-semibold text-center text-tadak-black">
              정말 삭제하시겠어요?
            </h2>
            <p className="mb-6 text-sm text-center text-tadak-dark-gray">
              이 리뷰는 삭제 후 복구할 수 없습니다.
            </p>

            <img
              src={deleteDuck}
              alt="삭제 안내 오리"
              className="mb-8 w-36 h-36"
            />

            <div className="flex w-full gap-2">
              <button
                onClick={handleDelete}
                className="flex-1 h-10 text-white rounded-lg bg-tadak-warning hover:bg-red-500"
              >
                삭제하기
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewDeleteDialog
