// src/components/customKeyboard/modals/KeyboardModal.tsx
import { X } from 'lucide-react'

interface KeyboardModalProps {
  onClose: () => void
}

const KeyboardModal = ({ onClose }: KeyboardModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[1360px] h-[710px] rounded-xl p-8 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default KeyboardModal