import ProgressBar from '@/components/kbti/ProgressBar'
import QuestionDisplay from '@/components/kbti/QuestionDisplay'
import { kbtiQuestions } from '@/types/kbti'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    if (currentQuestion < kbtiQuestions.length - 1) {
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
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8">
      <ProgressBar current={currentQuestion + 1} total={kbtiQuestions.length} />

      <div className="flex flex-col items-center w-full gap-4 justify-evenly">
        <QuestionDisplay
          question={kbtiQuestions[currentQuestion]}
          onAnswer={(choice) =>
            handleAnswer(kbtiQuestions[currentQuestion].axis, choice)
          }
        />
      </div>
    </div>
  )
}

export default KbtiTestPage
