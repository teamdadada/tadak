import { motion } from 'framer-motion'
import clsx from 'clsx'

const DotWave = ({ className = '' }: { className?: string }) => {
  return (
    <span className={clsx('inline-flex gap-[2px]', className)}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          ·
        </motion.span>
      ))}
    </span>
  )
}

export default DotWave
