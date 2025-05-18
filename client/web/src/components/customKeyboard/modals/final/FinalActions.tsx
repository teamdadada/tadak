interface FinalActionsProps {
  setStep: (step: number) => void
}

const FinalActions = ({ setStep }: FinalActionsProps) => {
  return (
    <div className="flex justify-end gap-4 mt-2">
      <button
        onClick={() => setStep(3)} // 이전: 키캡 단계
        className="w-72 h-10 border border-gray-300 rounded text-tadak-dark-gray hover:bg-tadak-light-gray hover:border-tadak-light-gray mr-96"
      >
        이전
      </button>
      <button className="w-72 h-10 bg-tadak-primary text-white rounded font-semibold ml-2 mr-2 hover:bg-tadak-light-primary hover:text-tadak-primary">
        서랍장에만 저장하기
      </button>
      <button className="w-72 h-10 bg-tadak-secondary text-white rounded font-semibold hover:bg-tadak-light-secondary hover:text-tadak-secondary">
        장바구니 담기
      </button>
    </div>
  )
}

export default FinalActions
