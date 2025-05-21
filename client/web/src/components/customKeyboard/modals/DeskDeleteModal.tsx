import { X } from 'lucide-react'
import deleteDuck from '@/assets/images/delete.png'

interface DeskDeleteModalProps {
  onConfirm: () => void
  onCancel: () => void
}

const DeskDeleteModal = ({ onConfirm, onCancel }: DeskDeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
        <button
          onClick={onCancel}
          className="absolute text-gray-500 top-4 right-4 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="mt-4 mb-4 text-lg font-semibold text-center text-tadak-black">
          정말 삭제하시겠어요?
        </h2>
        <p className="mb-6 text-sm text-center text-tadak-dark-gray">
          내 데스크 이미지를 삭제하시겠습니까?
        </p>

        {/* 오리 이미지 */}
        <img src={deleteDuck} alt="삭제 안내 오리" className="mb-8 w-36 h-36" />

        <div className="flex w-full gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 h-10 text-white rounded-lg bg-tadak-warning hover:bg-red-500"
          >
            삭제하기
          </button>
          <button
            onClick={onCancel}
            className="flex-1 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeskDeleteModal
