// src/components/customKeyboard/modals/DeskModal.tsx
import { X } from 'lucide-react'
import mockDesk1 from '@/assets/images/mock-desk-1.png'
import mockDesk2 from '@/assets/images/mock-desk-2.png'

interface DeskModalProps {
  onClose: () => void
}

const DeskModal = ({ onClose }: DeskModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="relative bg-white w-[520px] h-[420px] rounded-xl p-6 shadow-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 제목 */}
        <h2 className="text-xl text-tadak-black font-semibold mt-4 mb-2">📸 이미지 업로드</h2>
        <p className="text-sm text-tadak-dark-gray font-semibold mb-6">
          정면 또는 약간 위에서 촬영해주세요.
        </p>
        <p className="text-sm text-tadak-primary font-medium mb-2">📌 아래 예시처럼 촬영해 주세요!</p>

        {/* 예시 이미지 */}
        <div className="flex gap-4 justify-center mb-8">
          <img
            src={mockDesk1}
            alt="예시1"
            className="w-60 h-40 object-cover rounded"
          />
          <img
            src={mockDesk2}
            alt="예시2"
            className="w-60 h-40 object-cover rounded"
          />
        </div>

        {/* 업로드 버튼 */}
        <button className="w-full h-12 bg-tadak-secondary text-white rounded-lg hover:bg-tadak-light-secondary hover:text-tadak-secondary">
          사진 업로드 하기
        </button>
      </div>
    </div>
  )
}

export default DeskModal