interface StepNavigationProps {
  step: number
  setStep: (step: number) => void
}

const StepNavigation = ({ step, setStep }: StepNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      {/* 이전 버튼은 step > 1일 때만 표시 */}
      {step > 1 ? (
        <button
          onClick={() => setStep(step - 1)}
          className="w-28 h-10 border border-gray-300 text-tadak-dark-gray rounded hover:bg-tadak-light-gray hover:border-tadak-light-gray"
        >
          이전
        </button>
      ) : (
        <div className="w-28" /> // 버튼 자리 유지용 빈 div
      )}

      <button
        onClick={() => setStep(step + 1)}
        className="w-28 h-10 bg-tadak-secondary rounded text-white font-semibold hover:bg-tadak-light-secondary hover:text-tadak-secondary"
      >
        다음
      </button>
    </div>
  )
}

export default StepNavigation
