import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 1,
    text: '타건음이 잘 들릴 때 집중이 잘 되나요?',
    options: ['아니요, 조용한 게 더 좋아요', '네, 찰칵찰칵 소리가 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 2,
    text: 'RGB나 조명이 있는 키보드가 마음에 드시나요?',
    options: ['눈에 띄는 건 별로예요', '감성적으로 너무 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 3,
    text: '소리가 적은 키보드와 반짝이는 키보드 중 고른다면?',
    options: ['조용한 키보드가 더 좋아요', '시각적으로 화려한 게 더 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 4,
    text: '키보드를 고를 때 가장 중요한 건 무엇인가요?',
    options: ['기능과 내구성이요', '디자인과 색감이요'],
    axis: ['T', 'A'],
  },
  {
    id: 5,
    text: '주변에 추천할 때 뭐라고 말할 것 같나요?',
    options: ['이건 성능이 정말 좋아', '이건 너무 예쁘고 분위기 있어'],
    axis: ['T', 'A'],
  },
  {
    id: 6,
    text: '키보드 설명에서 어떤 부분이 먼저 눈에 들어오나요?',
    options: ['스펙과 기능 정보', '이미지와 디자인 포인트'],
    axis: ['T', 'A'],
  },
  {
    id: 7,
    text: '책상 위에 물건은 어느 정도만 올려두시나요?',
    options: [
      '자주 쓰는 것만 올려둬요',
      '장비랑 악세서리 다 올려두는 편이에요',
    ],
    axis: ['M', 'F'],
  },
  {
    id: 8,
    text: '거치대, 데스크패드, 무드등… 이런 것들',
    options: ['없어도 괜찮아요', '있어야 책상이 완성된 느낌이에요'],
    axis: ['M', 'F'],
  },
  {
    id: 9,
    text: '책상에 내가 직접 고른 장비가 몇 개나 있나요?',
    options: ['1~2개만 있어요', '종류별로 다양하게 있어요'],
    axis: ['M', 'F'],
  },
  {
    id: 10,
    text: '책상을 쓸 때 상태는 어떤가요?',
    options: ['항상 정리돼 있어요', '자주 어질러져 있어요'],
    axis: ['C', 'P'],
  },
  {
    id: 11,
    text: '정리된 책상이 일할 때 도움이 되나요?',
    options: ['네, 깔끔해야 집중돼요', '아니요, 어느 정도 지저분해도 괜찮아요'],
    axis: ['C', 'P'],
  },
  {
    id: 12,
    text: '누가 갑자기 내 책상을 본다면?',
    options: ['정리되어 있어서 부끄럽지 않다', '이건 내 스타일, 손대지 마!'],
    axis: ['C', 'P'],
  },
]

const KbtiTestPage = () => {
  const navigate = useNavigate()
  const [scores, setScores] = useState<Record<string, number>>({
    Q: 0,
    E: 0,
    T: 0,
    A: 0,
    M: 0,
    F: 0,
    C: 0,
    P: 0,
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleAnswer = (axis: string[], choice: number) => {
    const newScores = { ...scores }
    newScores[axis[choice]] += 1
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const result = calculateKBTI(newScores)
      navigate(`/kbti/result?type=${result}`)
    }
  }

  const calculateKBTI = (scores: Record<string, number>) => {
    return `${scores.Q >= scores.E ? 'Q' : 'E'}${scores.T >= scores.A ? 'T' : 'A'}${scores.M >= scores.F ? 'M' : 'F'}${scores.C >= scores.P ? 'C' : 'P'}`
  }

  return (
    <div className="flex flex-col max-w-[90%] items-center justify-evenly gap-4 p-8 h-[calc(100vh-68px)] relative">
      <div className="flex flex-col gap-4">
        <div className="w-full h-2 mb-4 rounded-full bg-tadak-white">
          <div
            className="w-full h-2 transition-all rounded-full bg-tadak-primary"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <h1 className="w-full mb-2 text-2xl font-bold">
          {questions[currentQuestion].text}
        </h1>

        <div className="flex h-[20vh]"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-2 mt-4 space-y-2">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(questions[currentQuestion].axis, index)}
            className="block w-full px-4 py-2 text-lg font-medium text-left text-black border rounded-md hover:bg-tadak-primary hover:text-white bg-tadak-white"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default KbtiTestPage
