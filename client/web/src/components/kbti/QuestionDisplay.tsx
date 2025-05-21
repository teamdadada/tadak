import { KbtiQuestion } from '@/types/kbti'
import { motion } from 'framer-motion'
import GradientButton from './GradientButton'

interface QuestionDisplayProps {
  question: KbtiQuestion
  onAnswer: (choice: number) => void
}

const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-16 w-full max-w-[600px] py-8 px-4">
      {/* 질문 헤더 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-lg font-semibold text-center">{question.text}</h1>
      </motion.div>

      {/* 답변 버튼 */}
      <motion.div
        className="flex flex-col items-center justify-center w-full gap-5 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {question.options.map((option, index) => (
          <GradientButton
            key={`${question.id}-${index}`}
            onClick={() => onAnswer(index)}
            id={`option-${index}`}
            className="w-full px-8 py-6"
          >
            {option}
          </GradientButton>
        ))}
      </motion.div>
    </div>
  )
}

export default QuestionDisplay
