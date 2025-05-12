import { useLocation, useNavigate } from 'react-router-dom'

const KbtiResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { result } = location.state || {}

  const kbtiDescriptions = {
    QTMC: {
      nickname: '정리된 기술 마스터',
      description:
        '성능과 실용성을 최우선으로 하며, 책상에 필요한 장비만 두고 깔끔하게 정리하는 사람.',
      expressions: [
        '필요한 것만 책상에 올려두고 싶어요.',
        'RGB보다는 깔끔한 디자인이 좋아요.',
      ],
    },
    QTMP: {
      nickname: '조용한 정리 회피자',
      description: '성능을 우선시하지만 정리에는 신경을 덜 쓰는 사람.',
      expressions: [
        '중요한 건 성능이지, 정리는 나중에 해도 돼요.',
        '필요한 건 여기저기 두는 편이에요.',
      ],
    },
  }

  const kbti = kbtiDescriptions[result as keyof typeof kbtiDescriptions] || {}

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
        <button
          className="px-4 py-2 mt-4 text-white rounded-md bg-tadak-primary"
          onClick={() => navigate('/kbti')}
        >
          KBTI 다시 시작하기
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="mb-4 text-3xl font-bold">당신의 KBTI 결과는 {result}!</h1>
      <h2 className="text-xl font-semibold">{kbti.nickname}</h2>
      <p className="mt-2 text-lg">{kbti.description}</p>
      <ul className="mt-4 space-y-2">
        {kbti.expressions?.map((expression, index) => (
          <li key={index} className="text-md">
            {expression}
          </li>
        ))}
      </ul>

      <button
        className="px-4 py-2 mt-4 text-white rounded-md bg-tadak-primary"
        onClick={() => navigate('/kbti')}
      >
        다시 검사하기
      </button>
    </div>
  )
}

export default KbtiResultPage
