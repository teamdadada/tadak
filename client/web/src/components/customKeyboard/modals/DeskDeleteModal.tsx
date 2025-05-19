import { X } from 'lucide-react'
import deleteDuck from '@/assets/images/delete.png'

interface DeskDeleteModalProps {
  onConfirm: () => void
  onCancel: () => void
}

const DeskDeleteModal = ({ onConfirm, onCancel }: DeskDeleteModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg text-tadak-black font-semibold mt-4 mb-4 text-center">정말 삭제하시겠어요?</h2>
        <p className="text-sm text-tadak-dark-gray text-center mb-6">
          내 데스크 이미지를 삭제하시겠습니까?
        </p>

        {/* 오리 이미지 */}
        <img
          src={deleteDuck}
          alt="삭제 안내 오리"
          className="w-36 h-36 mb-8"
        />

        <div className="flex gap-2 w-full">
          <button
            onClick={onConfirm}
            className="flex-1 h-10 bg-tadak-warning text-white rounded-lg hover:bg-red-500"
          >
            삭제하기
          </button>
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeskDeleteModal