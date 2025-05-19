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
        'hover:cursor-default h-14 text-sm font-medium rounded-md shadow transition-all duration-150 flex pt-1 justify-center bg-white text-black',
        isActive && 'bg-tadak-primary text-white',
        'shadow-[4px_4px_22.3px_0px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {label === 'Backspace' ? (
        <>
          <span className="sm:block hidden text-xs md:text-sm">{label}</span>
          <span className="sm:hidden block text-xs md:text-sm">Back Space</span>
        </>
      ) : (
        <span className="text-xs md:text-sm">{label}</span>
      )}
    </button>
  )
}

export default Key
