import { KbtiQuestion } from '@/types/kbti'

interface QuestionDisplayProps {
  question: KbtiQuestion
  onAnswer: (choice: number) => void
}

const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[600px]">
      <h1 className="min-w-full mb-2 text-2xl font-bold text-start min-h-[5.5rem]">
        {question.text}
      </h1>

      <div className="flex items-center justify-center h-[30vh] w-full max-w-[500px]">
        {question.image ? (
          <img
            src={question.image}
            alt="질문 이미지"
            className="min-h-[30vh] max-h-[30vh] w-auto object-contain"
          />
        ) : (
          <div className="w-full h-[30vh]"></div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center min-w-full gap-2 mt-4 space-y-2">
        {question.options.map((option, index) => (
          <button
            key={`${question.id}-${index}`}
            onClick={() => onAnswer(index)}
            className="block w-full px-4 py-2 text-lg font-medium text-left text-black border rounded-md hover:bg-tadak-primary hover:text-white bg-tadak-white focus:outline-none"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionDisplay
