import { useState } from 'react'
import { motion } from 'framer-motion'

interface GradientButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  id?: string
}

const GradientButton = ({
  onClick,
  children,
  className = '',
  id,
}: GradientButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      id={id}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center px-4 text-[15px] font-semibold text-center rounded-full transition-all duration-300 ease-in-out overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ minHeight: '40px' }} // 최소 높이 설정
    >
      {/* 배경 그라데이션 */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-bl transition-opacity duration-300
          ${isHovered ? 'from-tadak-light-primary to-tadak-warning/10' : 'from-tadak-warning/10 to-tadak-light-primary'}
        `}
      />

      {/* 텍스트 */}
      <div className="relative flex justify-center items-center h-full text-center text-tadak-black">
        {children}
      </div>
    </motion.button>
  )
}

export default GradientButton
  