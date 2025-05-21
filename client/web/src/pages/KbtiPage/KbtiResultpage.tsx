import KakaoShareButton from '@/components/kbti/KakaoShareButton'
import { Button } from '@/components/ui/button'
import { kbtiDescriptions } from '@/types/kbti'
import { useNavigate, useSearchParams } from 'react-router-dom'

const KbtiResultPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const result = searchParams.get('type')

  const kbti = kbtiDescriptions[result as keyof typeof kbtiDescriptions] || {}

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
        <Button variant="default" size="lg" onClick={() => navigate('/kbti')}>
          KBTI 다시 시작하기
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
      <h2 className="w-full text-xl font-semibold text-start">
        당신의 KBTI 결과는....?
      </h2>
      <div className="text-center">
        {kbti.image && (
          <img
            src={kbti.image}
            alt={kbti.nickname}
            className="w-full max-w-sm mx-auto mb-4 rounded-sm"
          />
        )}
      </div>
      {/* <p className="w-full mt-2 text-lg">{kbti.description}</p> */}
      <ul className="space-y-2">
        {kbti.expressions?.map((expression, index) => (
          <li key={index} className="text-center text-md">
            "{expression}"
          </li>
        ))}
      </ul>

      <div className="flex flex-row items-center justify-center gap-4 mt-4">
        <KakaoShareButton kbtiType={result} />
        <Button size="lg" onClick={() => navigate('/kbti')}>
          다시 검사하기
        </Button>
      </div>
    </div>
  )
}

export default KbtiResultPage
