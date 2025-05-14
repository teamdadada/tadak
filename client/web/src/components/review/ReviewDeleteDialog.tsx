import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { deleteReview } from '@/services/reviewService'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const ReviewDeleteDialog = ({ reviewId }: { reviewId: number }) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId)
      toast.success('리뷰가 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      setOpen(false)
    } catch {
      toast.error('삭제에 실패했습니다.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-2 py-1 text-xs transition border rounded text-tadak-secondary border-tadak-secondary hover:bg-tadak-secondary hover:text-white">
          삭제
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 리뷰가 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
              취소
            </button>
          </DialogClose>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDeleteDialog
