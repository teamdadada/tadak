import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { deleteCart } from '@/services/cartService'
import deleteDuck from '@/assets/images/delete.png'

interface CartMultiDeleteModalProps {
  keyboardIdList: number[]
  onClose: () => void
}

const CartMultiDeleteModal = ({
  keyboardIdList,
  onClose,
}: CartMultiDeleteModalProps) => {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteCart(keyboardIdList)
      toast.success('선택한 항목이 삭제되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['cartList'] })
      onClose()
    } catch {
      toast.error('삭제 중 오류가 발생했어요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="mt-4 mb-4 text-lg font-semibold text-center text-tadak-black">
          선택한 항목을 삭제하시겠어요?
        </h2>
        <p className="mb-6 text-sm text-center text-tadak-dark-gray">
          총 {keyboardIdList.length}개의 키보드가 삭제됩니다.
        </p>

        <img src={deleteDuck} alt="삭제 안내 오리" className="mb-8 w-36 h-36" />

        <div className="flex w-full gap-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 h-10 text-white rounded-lg bg-tadak-warning hover:bg-red-500 disabled:opacity-60"
          >
            삭제하기
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartMultiDeleteModal
