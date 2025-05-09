import KbtiStartImage from '@/assets/images/KBTI_start.svg'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const KbtiStartPage = () => {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate('/kbti/test')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)] gap-8 p-4">
      <img
        src={KbtiStartImage}
        alt="KBTI 시작 이미지"
        className="w-full p-4 max-h-[70vh]"
      />
      <div className="flex justify-center w-full">
        <Button size="lg" onClick={handleStartTest}>
          테스트 해보기
        </Button>
      </div>
    </div>
  )
}

export default KbtiStartPage
