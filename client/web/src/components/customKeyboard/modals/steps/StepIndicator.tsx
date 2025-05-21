interface StepIndicatorProps {
  step: number
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  const steps = ['베어본', '스위치', '키캡']

  return (
    <div className="flex items-center gap-6">
      {steps.map((label, index) => {
        const stepNum = index + 1
        const isActive = step === stepNum

        return (
          <div key={stepNum} className="flex items-center gap-3">
            {/* 원형 숫자 */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                isActive
                  ? 'bg-tadak-primary text-white'
                  : 'bg-gray-200 text-white'
              }`}
            >
              {stepNum}
            </div>
            {/* 라벨 */}
            <span className="text-sm font-base text-tadak-black">{label}</span>

            {/* 연결선 (마지막은 생략) */}
            {index < steps.length - 1 && (
              <div className="w-16 h-px border-t border-dashed border-gray-400 mx-2" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator
