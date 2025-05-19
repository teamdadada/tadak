import { useState } from 'react'
import StepIndicator from './StepIndicator'
import KeyboardPreview3D from './KeyboardPreview3D'
import ProductSummary from './ProductSummary'
import StepNavigation from './StepNavigation'
import StepBarebone from './StepBarebone'
import StepSwitch from './StepSwitch'
import StepKeycap from './StepKeycap'
import { KeyboardOptionsResponse } from '@/types/keyboard'
import { Product } from '@/types/product'

interface DesignStepProps {
  step: number
  setStep: (step: number) => void
  keyboardOptions: KeyboardOptionsResponse
}

const DesignStep = ({ step, setStep, keyboardOptions }: DesignStepProps) => {
  const [layout, setLayout] = useState<'풀배열' | '텐키리스'>('풀배열')
  const [material, setMaterial] = useState<'금속' | '플라스틱'>('금속')
  const [outerColor, setOuterColor] = useState('#ffffff')
  const [basicColor, setBasicColor] = useState('#ffffff')

  const [pointColor, setPointColor] = useState('#FFFFFF')
  const [pointOption, setPointOption] = useState<'none' | 'set' | 'custom'>('none')
  const [focusedKey, setFocusedKey] = useState<string | null>(null)
  const [customKeyMap, setCustomKeyMap] = useState<Record<string, string>>({})

  const [bareboneProduct, setBareboneProduct] = useState<Product | null>(null)

  return (
    <>
      <StepIndicator step={step} />

      <div className="flex mt-6 gap-4 h-[590px]">
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-center h-[400px]">
            <KeyboardPreview3D
              layout={layout}
              materialType={material}
              outerColor={outerColor}
              basicColor={basicColor}
              pointColor={pointColor}
              pointOption={pointOption}
              customKeyMap={customKeyMap}
              setCustomKeyMap={setCustomKeyMap}
              focusedKey={focusedKey}
              setFocusedKey={setFocusedKey}
            />
          </div>
          <div className="mt-6 h-48 items-center justify-center">
            <ProductSummary
              product={bareboneProduct}
              layout={layout}
              material={material}
              outerColor={outerColor}
            />
          </div>
        </div>

        <div className="w-[600px] flex flex-col justify-start">
          <div className="flex-1 flex items-center justify-center text-2xl font-semibold">
            {step === 1 && (
              <StepBarebone
                layout={layout}
                setLayout={setLayout}
                material={material}
                setMaterial={setMaterial}
                outerColor={outerColor}
                setOuterColor={setOuterColor}
                layoutOptions={keyboardOptions.barebone.layout}
                materialOptions={keyboardOptions.barebone.material}
                onProductChange={setBareboneProduct}
              />
            )}
            {step === 2 && <StepSwitch />}
            {step === 3 && (
              <StepKeycap
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
              />
            )}
          </div>
          <StepNavigation step={step} setStep={setStep} />
        </div>
      </div>
    </>
  )
}

export default DesignStep