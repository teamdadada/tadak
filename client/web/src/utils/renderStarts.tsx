import { Star } from 'lucide-react'
import React from 'react'

export const renderStars = (
  score: number,
  size: number = 6,
  primaryColor: string = 'text-tadak-primary',
  emptyColor: string = 'text-tadak-gray/40',
): React.ReactNode => {
  const fullStars = Math.floor(score)
  const hasHalfStar = score - fullStars >= 0.5

  return (
    <div className={`flex ${primaryColor}`}>
      {/* 채워진 별 */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-${size} h-${size} fill-current`}
        />
      ))}

      {/* 반 별 */}
      {hasHalfStar && (
        <Star
          key="half"
          className={`w-${size} h-${size} fill-current`}
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        />
      )}

      {/* 빈 별 */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
        (_, i) => (
          <Star
            key={`empty-${i}`}
            className={`w-${size} h-${size} ${emptyColor}`}
          />
        ),
      )}
    </div>
  )
}

export const starStyles = {
  primary: {
    filled: 'text-tadak-primary',
    empty: 'text-tadak-gray/40',
  },
  yellow: {
    filled: 'text-yellow-500',
    empty: 'text-gray-300',
  },
  gold: {
    filled: 'text-amber-500',
    empty: 'text-gray-300',
  },
}
