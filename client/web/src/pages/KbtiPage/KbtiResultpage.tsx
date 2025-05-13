import KakaoShareButton from '@/components/kbti/KakaoShareButton'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'

const KbtiResultPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const result = searchParams.get('type')

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
    QTFC: {
      nickname: '정리된 성능 애호가',
      description:
        '다양한 성능 좋은 장비를 사용하는 것을 좋아하면서도, 이를 깔끔하게 정리하고 체계적으로 관리하는 사람.',
      expressions: [
        '장비는 많지만, 다 깔끔하게 정리돼 있어요.',
        '성능 좋은 장비들이 제 책상을 완성하죠.',
      ],
    },
    QTFP: {
      nickname: '혼돈의 기술 덕후',
      description:
        '성능 좋은 장비를 많이 사용하며, 책상은 항상 다양한 장비로 채워져 있지만 정리는 잘 하지 않는 사람.',
      expressions: [
        '성능이 제일 중요해요. 정리는 나중 문제죠.',
        '어디에 두었는지 아는 게 중요하죠.',
      ],
    },
    QAMC: {
      nickname: '감성 깔끔주의자',
      description:
        '심플하고 감성적인 디자인을 선호하며, 불필요한 장비 없이 깔끔하게 데스크를 꾸미는 사람.',
      expressions: [
        '디자인이 예쁘면서도 깔끔해야 해요.',
        '필요한 것만 놓고 미니멀하게 유지하고 싶어요.',
      ],
    },
    QAMP: {
      nickname: '감성 무질서주의자',
      description:
        '감성적인 아이템을 좋아하지만, 정리 정돈에는 큰 의미를 두지 않는 사람.',
      expressions: ['예쁜 건 많을수록 좋아요.', '정리보다는 감성이 중요하죠.'],
    },
    QAFC: {
      nickname: '감성 장비 마스터',
      description:
        '다양한 감성적인 아이템을 갖추고 있으면서도, 깔끔하고 체계적으로 정리하는 사람.',
      expressions: [
        '예쁘고 깔끔한 데스크가 제 취향이에요.',
        '디자인과 깔끔함 모두 놓칠 수 없어요.',
      ],
    },
    QAFP: {
      nickname: '감성 혼돈주의자',
      description:
        '감성적이고 다양한 아이템을 좋아하여 책상에 많이 두지만, 정리하지 않고 자연스러운 어수선함을 감성으로 여긴다.',
      expressions: [
        '책상에 감성적인 게 많아야 제 스타일이죠.',
        '예쁜 것들이 많아도 어디에 있는지는 알아요.',
      ],
    },
    ETMC: {
      nickname: '화려한 정리 마스터',
      description:
        '성능도 중요하지만, 디자인적인 요소로 눈에 띄는 깔끔함을 선호하는 사람.',
      expressions: [
        '성능도 좋고 디자인도 눈에 띄어야죠.',
        '깔끔하지만 존재감 있는 게 좋아요.',
      ],
    },
    ETMP: {
      nickname: '화려한 무질서주의자',
      description:
        '성능과 디자인 모두 중요한 사람으로, 장비는 화려하지만 책상은 어수선하게 유지되는 스타일.',
      expressions: [
        '화려한 장비들이 여기저기 있어야 마음이 편해요.',
        '정리보다는 멋진 게 우선이에요.',
      ],
    },
    ETFC: {
      nickname: '화려한 성능 마스터',
      description:
        '성능 좋은 화려한 장비들을 완벽히 정리하고 깔끔하게 유지하는 사람.',
      expressions: [
        '성능과 디자인, 둘 다 놓칠 수 없어요.',
        '화려해도 깔끔하게 정리된 게 좋아요.',
      ],
    },
    ETFP: {
      nickname: '화려한 혼돈주의자',
      description: '성능도 좋고, 디자인도 화려하지만 정리는 잘 하지 않는 사람.',
      expressions: ['화려하고 성능 좋은 게 최고죠.', '정리는 나중에 할게요.'],
    },
    EAMC: {
      nickname: '화려한 감성 마스터',
      description:
        '감성적이고 화려한 디자인을 선호하지만, 깔끔하게 정리하는 것을 중요시하는 사람.',
      expressions: [
        '예쁘면서 깔끔해야 완벽하죠.',
        '감성적인 것도 정리가 필요해요.',
      ],
    },
    EAMP: {
      nickname: '화려한 감성 혼돈주의자',
      description:
        '감성적이고 화려한 디자인을 좋아하며, 다양한 아이템이 책상에 놓여 있는 것을 선호하는 사람.',
      expressions: [
        '예쁜 것들은 많아야 기분이 좋아요.',
        '정리보다는 감성적인 느낌이 중요해요.',
      ],
    },
    EAFC: {
      nickname: '감성 장비 정리 마스터',
      description:
        '감성적인 장비와 악세서리를 많이 소유하면서도, 이를 깔끔하게 정리하는 것을 중요시하는 사람.',
      expressions: [
        '예쁘고 정돈된 게 진짜 감성이에요.',
        '장비가 많아도 깔끔하게 유지할 수 있어요.',
      ],
    },
    EAFP: {
      nickname: '감성 혼돈 마스터',
      description:
        '감성적이고 화려한 디자인을 사랑하며, 다양한 아이템이 가득한 어수선한 책상을 자신의 스타일로 받아들이는 사람.',
      expressions: [
        '예쁜 게 많아야 행복해요.',
        '어지러워도 감성적인 게 최고죠.',
      ],
    },
  }

  const kbti = kbtiDescriptions[result as keyof typeof kbtiDescriptions] || {}

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
        <Button variant="default" size="lg" onClick={() => navigate('/kbti')}>
          KBTI 다시 시작하기
        </Button>
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
