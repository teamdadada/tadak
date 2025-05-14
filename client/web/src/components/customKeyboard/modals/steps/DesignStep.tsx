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
  return (
    <>
      <StepIndicator step={step} />

      <div className="flex mt-6 gap-4 h-[590px]">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col flex-1">
          <div className="flex-1 flex items-center justify-center">
            <KeyboardPreview3D />
          </div>
          <div className="mt-6 h-60 items-center justify-center">
            <ProductSummary />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-[600px] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center text-2xl font-semibold">
            {step === 1 && <StepBarebone />}
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
