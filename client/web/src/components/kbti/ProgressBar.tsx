interface ProgressBarProps {
  current: number
  total: number
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = (current / total) * 100

  return (
    <div className="w-full h-4 mb-4 rounded-full bg-tadak-white">
      <div
        className="h-4 transition-all rounded-full bg-gradient-to-r from-tadak-warning/60 to-tadak-light-secondary "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
