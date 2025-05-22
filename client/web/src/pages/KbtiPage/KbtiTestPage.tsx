import ProgressBar from '@/components/kbti/ProgressBar'
import QuestionDisplay from '@/components/kbti/QuestionDisplay'
import { Button } from '@/components/ui/button'
import { kbtiQuestions } from '@/types/kbti'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const KbtiTestPage = () => {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<number[]>([])

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

    setAnswers((prev) => [...prev, choice])

    if (currentQuestion < kbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const result = calculateKBTI(newScores)
      navigate(`/kbti/result?type=${result}`)
    }
  }

  const handleBack = () => {
    if (currentQuestion === 0) return

    const prevChoice = answers[currentQuestion - 1]
    const prevAxis = kbtiQuestions[currentQuestion - 1].axis

    const newScores = { ...scores }
    newScores[prevAxis[prevChoice]] -= 1
    setScores(newScores)

    setAnswers((prev) => prev.slice(0, -1)) // 마지막 선택 제거
    setCurrentQuestion(currentQuestion - 1)
  }

  const calculateKBTI = (scores: Record<string, number>) => {
    return `${scores.Q >= scores.E ? 'Q' : 'E'}${scores.T >= scores.A ? 'T' : 'A'}${scores.M >= scores.F ? 'M' : 'F'}${scores.C >= scores.P ? 'C' : 'P'}`
  }

  return (
    <div className="flex flex-col items-center w-full max-h-screen gap-4 p-8 justify-between">
      <ProgressBar current={currentQuestion + 1} total={kbtiQuestions.length} />

      <div className="flex flex-col items-center w-full gap-4 ">
        <QuestionDisplay
          question={kbtiQuestions[currentQuestion]}
          onAnswer={(choice) =>
            handleAnswer(kbtiQuestions[currentQuestion].axis, choice)
          }
        />
      </div>
      <div className="flex justify-start w-full mt-6">
        <Button
          onClick={handleBack}
          disabled={currentQuestion === 0}
          className="bg-transparent shadow-none text-tadak-black hover:bg-transparent hover:scale-110"
        >
          <ChevronLeft />
          이전
        </Button>
      </div>
    </div>
  )
}

export default KbtiTestPage
