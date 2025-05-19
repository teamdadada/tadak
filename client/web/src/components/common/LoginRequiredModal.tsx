import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import runDuck from '@/assets/images/run.png' // 이미지 경로는 프로젝트에 맞게 수정

interface LoginRequiredModalProps {
  onClose: () => void
}

const LoginRequiredModal = ({ onClose }: LoginRequiredModalProps) => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    onClose()
    navigate('/account/login')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="relative bg-white w-[400px] rounded-xl p-6 shadow-xl flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 텍스트 안내 */}
        <h2 className="text-lg font-semibold mt-4 mb-2 text-center">로그인이 필요해요</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
            로그인해야 이 기능을 이용할 수 있어요.
        </p>
        
        {/* 오리 이미지 */}
        <img
          src={runDuck}
          alt="로그인 안내 오리"
          className="w-32 h-32 mb-4"
        />

        {/* 로그인하러 가기 버튼 */}
        <button
          onClick={handleGoToLogin}
          className="w-full h-10 bg-tadak-primary text-white rounded-lg hover:bg-orange-500"
        >
          로그인하러 가기
        </button>
      </div>
    </div>
  )
}

export default LoginRequiredModal