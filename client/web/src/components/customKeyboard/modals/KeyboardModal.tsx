// src/components/customKeyboard/modals/KeyboardModal.tsx
import { useKeyboardOptions } from '@/hooks/useKeyboard'
import { X } from 'lucide-react'
import DesignStep from './steps/DesignStep'
import FinalStep from './final/FinalStep'
import { useState } from 'react'

interface KeyboardModalProps {
  onClose: () => void
}

const KeyboardModal = ({ onClose }: KeyboardModalProps) => {
  const [step, setStep] = useState(1)
  const { data: keyboardOptions, isLoading } = useKeyboardOptions()

  if (isLoading || !keyboardOptions) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[1360px] h-[710px] rounded-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {step <= 3 ? (
          <DesignStep step={step} setStep={setStep} keyboardOptions={keyboardOptions}/>
        ) : (
          <FinalStep setStep={setStep} />
        )}
      </div>
    </div>
  )
}

export default KeyboardModal
