import FinalKeyboardPreview from './FinalKeyboardPreview'
import FinalProductList from './FinalProductList'
import FinalActions from './FinalActions'

interface FinalStepProps {
  setStep: (step: number) => void
}

const FinalStep = ({ setStep }: FinalStepProps) => {
  return (
    <div className="flex flex-col gap-4 mt-12 h-[590px]">
      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex items-center justify-center">
          <FinalKeyboardPreview />
        </div>
        <div className="w-[600px] flex items-center justify-center">
          <FinalProductList />
        </div>
      </div>
      <FinalActions setStep={setStep} />
    </div>
  )
}

export default FinalStep
