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
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

const ReviewDeleteDialog = ({
  reviewId,
  productId,
}: {
  reviewId: number
  productId: number
}) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId)
      toast.success('리뷰가 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['reviewList', productId] })
      setOpen(false)
    } catch {
      toast.error('삭제에 실패했습니다.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs text-tadak-gray bg-transparent hover:bg-transparent hover:underline shadow-none flex items-center gap-1 p-1">
          삭제
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 리뷰가 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm rounded text-tadak-white bg-tadak-warning"
          >
            삭제
          </button>
          <DialogClose asChild>
            <button className="px-3 py-1 text-sm border rounded">취소</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDeleteDialog
