// components/customKeyboard/modals/steps/DesignStep.tsx
import { useState } from 'react'
import StepIndicator from './StepIndicator'
import KeyboardPreview3D from './KeyboardPreview3D'
import ProductSummary from './ProductSummary'
import StepNavigation from './StepNavigation'
import StepBarebone from './StepBarebone'
import StepSwitch from './StepSwitch'
import StepKeycap from './StepKeycap'

interface DesignStepProps {
  step: number
  setStep: (step: number) => void
}

const DesignStep = ({ step, setStep }: DesignStepProps) => {
  const [layout, setLayout] = useState<'풀배열' | '텐키리스'>('풀배열')
  const [material, setMaterial] = useState<'금속' | '플라스틱'>('금속')
  const [outerColor, setOuterColor] = useState<string>('#ffffff')

  return (
    <>
      <StepIndicator step={step} />

      <div className="flex mt-6 gap-4 h-[590px]">
        {/* 왼쪽: 3D 렌더링 및 요약 */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-center h-[400px]">
            <KeyboardPreview3D
              layout={layout}
              materialType={material}
              outerColor={outerColor}
            />
          </div>
          <div className="mt-6 h-60 items-center justify-center">
            <ProductSummary />
          </div>
        </div>

        {/* 오른쪽: 선택 영역 */}
        <div className="w-[600px] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center text-2xl font-semibold">
            {step === 1 && (
              <StepBarebone
                layout={layout}
                setLayout={setLayout}
                material={material}
                setMaterial={setMaterial}
                outerColor={outerColor}
                setOuterColor={setOuterColor}
              />
            )}
            {step === 2 && <StepSwitch />}
            {step === 3 && <StepKeycap />}
          </div>
          <StepNavigation step={step} setStep={setStep} />
        </div>
      </div>
    </>
  )
}

export default DesignStep