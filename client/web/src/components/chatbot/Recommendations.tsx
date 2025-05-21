import React from 'react'
import { Recommendation } from '@/types/chatbot'

interface KeyboardRecommendationsProps {
  recommendations?: Recommendation[]
}

const KeyboardRecommendations: React.FC<KeyboardRecommendationsProps> = ({
  recommendations,
}) => {
  if (!recommendations || recommendations.length === 0) return null

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-2">
        {recommendations.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-tadak-white/50 rounded-lg hover:bg-tadak-white/80 transition-colors"
          >
            <div className="w-16 h-16 overflow-hidden flex-shrink-0 border border-tadak-light-gray">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <p className="text-sm font-bold">
                {item.price.toLocaleString()}원
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default KeyboardRecommendations
