import { Star } from 'lucide-react'
import { useState } from 'react'

const StarRating = ({
  score,
  onChange,
}: {
  score: number
  onChange: (value: number) => void
}) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = hovered !== null ? value <= hovered : value <= score

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            className={`text-3xl transition-colors ${
              isFilled ? 'text-tadak-primary' : 'text-tadak-gray/40'
            }`}
          >
            <Star
              className={`w-6 h-6 transition ${
                isFilled ? 'text-tadak-primary' : 'text-tadak-gray/40'
              }`}
              fill={isFilled ? 'currentColor' : 'none'}
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
