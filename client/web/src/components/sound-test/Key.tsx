import { cn } from '@/lib/utils'

interface KeyProps {
  keyCode: string
  label: string
  isActive?: boolean
  className?: string
  onClick?: () => void
}

const Key = ({ keyCode, label, isActive, className, onClick }: KeyProps) => {
  return (
    <button
      onClick={onClick}
      data-key-code={keyCode}
      className={cn(
        'h-14 text-sm font-medium rounded-md shadow transition-all duration-150 flex pt-1 justify-center bg-white text-black',
        isActive && 'bg-tadak-primary text-white',
        'shadow-[4px_4px_22.3px_0px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {label || <span className="w-full h-full" />}{' '}
    </button>
  )
}

export default Key
