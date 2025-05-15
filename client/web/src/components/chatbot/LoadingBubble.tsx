import { motion } from 'framer-motion'

const LoadingBubble = () => {
  return (
    <div className="text-[15px] py-5 px-4 max-w-sm border-none rounded-lg mr-auto bg-tadak-light-gray whitespace-pre-wrap flex items-center space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-tadak-gray rounded-full"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default LoadingBubble
