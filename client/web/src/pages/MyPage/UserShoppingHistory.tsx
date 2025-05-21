import SorryTaduck from '@/assets/images/sorry.png'

const UserShoppingHistory = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 결제 내역 영역 */}
      <div className=" flex flex-col items-center justify-center min-h-[400px]">
        <img src={SorryTaduck} alt="인사타덕" className="w-32 h-32 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-tadak-black">
          서비스 준비 중
        </h2>
        <p className="text-tadak-black mb-6">
          주문 및 결제 내역을 확인할 수 있는 기능이 곧 제공될 예정입니다.
        </p>
      </div>
    </div>
  )
}

export default UserShoppingHistory
