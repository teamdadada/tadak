interface ProgressBarProps {
  current: number
  total: number
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const progress = (current / total) * 100

  return (
    <div className="w-full h-2 mb-4 rounded-full bg-tadak-white">
      <div
        className="h-2 transition-all rounded-full bg-tadak-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
