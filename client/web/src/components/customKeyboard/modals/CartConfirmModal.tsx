import { X } from 'lucide-react'
import cartTaduck from '@/assets/images/cart.png'

interface CartConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

const CartConfirmModal = ({ onConfirm, onCancel }: CartConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg text-tadak-black font-semibold mt-4 mb-4 text-center">
          장바구니에 담겼어요!
        </h2>
        <p className="text-sm text-tadak-dark-gray text-center mb-6">
          장바구니로 이동할까요?
        </p>

        <img
          src={cartTaduck}
          alt="장바구니 안내 오리"
          className="w-36 h-36 mb-8"
        />

        <div className="flex gap-2 w-full">
          <button
            onClick={onConfirm}
            className="flex-1 h-10 bg-tadak-primary text-white rounded-lg hover:bg-tadak-light-primary"
          >
            이동하기
          </button>
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartConfirmModal