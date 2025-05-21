import KbtiStartImage from '@/assets/images/KBTI_start.png'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const KbtiStartPage = () => {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate('/kbti/test')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
      <div className="flex flex-col justify-center w-full p-2">
        {/* <h1 className="w-full p-4 text-2xl font-bold">🔍 KBTI</h1> */}
        <img
          src={KbtiStartImage}
          alt="KBTI 시작 이미지"
          className="min-w-[300px] min-h-[470px] h-[70vh] object-contain"
        />
      </div>
      <div className="flex justify-center w-full p-4">
        <Button
          size="lg"
          className="bg-tadak-primary"
          onClick={handleStartTest}
        >
          테스트 해보기
        </Button>
      </div>
    </div>
  )
}

export default KbtiStartPage
