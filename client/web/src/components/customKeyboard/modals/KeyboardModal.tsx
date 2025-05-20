// src/components/customKeyboard/modals/KeyboardModal.tsx
import { useKeyboardOptions } from '@/hooks/useKeyboard'
import { X } from 'lucide-react'
import DesignStep from './steps/DesignStep'
import { useState } from 'react'
import { Product } from '@/types/product'

interface KeyboardModalProps {
  onClose: () => void
}

const KeyboardModal = ({ onClose }: KeyboardModalProps) => {
  const [step, setStep] = useState(1)
  const { data: keyboardOptions, isLoading } = useKeyboardOptions()

  const [layout, setLayout] = useState<'풀배열' | '텐키리스'>('풀배열')
  const [material, setMaterial] = useState<'금속' | '플라스틱'>('금속')
  const [outerColor, setOuterColor] = useState('#ffffff')
  const [basicColor, setBasicColor] = useState('#ffffff')
  const [pointColor, setPointColor] = useState('#FFFFFF')
  const [pointOption, setPointOption] = useState<'none' | 'set' | 'custom'>('none')
  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const [customKeyMap, setCustomKeyMap] = useState<Record<string, string>>({})
  const [switchTypeName, setSwitchTypeName] = useState<string>('청축')

  const [bareboneProduct, setBareboneProduct] = useState<Product | null>(null)
  const [switchProduct, setSwitchProduct] = useState<Product | null>(null)
  const [keycapProduct, setKeycapProduct] = useState<Product | null>(null)

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

        <DesignStep
          step={step}
          setStep={setStep}
          keyboardOptions={keyboardOptions}
          layout={layout}
          setLayout={setLayout}
          material={material}
          setMaterial={setMaterial}
          outerColor={outerColor}
          setOuterColor={setOuterColor}
          basicColor={basicColor}
          setBasicColor={setBasicColor}
          pointColor={pointColor}
          setPointColor={setPointColor}
          pointOption={pointOption}
          setPointOption={setPointOption}
          focusedKey={focusedKey}
          setFocusedKey={setFocusedKey}
          customKeyMap={customKeyMap}
          setCustomKeyMap={setCustomKeyMap}
          switchTypeName={switchTypeName}
          setSwitchTypeName={setSwitchTypeName}
          bareboneProduct={bareboneProduct}
          setBareboneProduct={setBareboneProduct}
          switchProduct={switchProduct}
          setSwitchProduct={setSwitchProduct}
          keycapProduct={keycapProduct}
          setKeycapProduct={setKeycapProduct}
        />
      </div>
    </div>
  )
}

export default KeyboardModal
