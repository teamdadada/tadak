import KbtiStartImage from '@/assets/images/KBTI_start.png'
import GradientButton from '@/components/kbti/GradientButton'
import { useNavigate } from 'react-router-dom'

const KbtiStartPage = () => {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate('/kbti/test')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
      <div className="flex flex-col justify-center w-full p-2">
        <img
          src={KbtiStartImage}
          alt="KBTI 시작 이미지"
          className="min-w-[300px] min-h-[470px] h-[70vh] object-contain"
        />
      </div>
      <div className="flex justify-center p-4 w-full">
        <GradientButton onClick={handleStartTest} className='"w-full px-8 py-4'>
          테스트 하러가기
        </GradientButton>
      </div>
    </div>
  )
}

export default KbtiStartPage
