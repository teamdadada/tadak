import { motion } from 'framer-motion'

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 py-12">
      {/* 헤더 텍스트 */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-tadak-black">
          당신의 성향 분석중...
        </h2>
        <p className="text-sm text-gray-600">
          키보드에 대한 당신의 취향을 분석하고 있어요
        </p>
      </motion.div>

      {/* 프로그레스 바 */}
      <motion.div
        className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '16rem', opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-tadak-light-primary to-tadak-warning/60"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 로딩 텍스트 */}
      <motion.div
        className="flex space-x-1 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {['분', '석', '중'].map((char, i) => (
          <motion.span
            key={i}
            className="text-tadak-black text-sm"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default LoadingAnimation
