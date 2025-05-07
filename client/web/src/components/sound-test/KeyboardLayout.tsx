import { cn } from '@/lib/utils'
import Key from './Key'
import { keyboardLayout } from './keyboardData'

interface KeyboardLayoutProps {
  activeKeys: string[]
}

const KeyboardLayout = ({ activeKeys }: KeyboardLayoutProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {keyboardLayout.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid grid-cols-60 gap-1 w-full max-w-5xl"
        >
          {row.map((key) => (
            <Key
              key={key.code}
              keyCode={key.code}
              label={key.label}
              isActive={activeKeys.includes(key.code)}
              className={cn({
                'col-span-4': !key.colSpan || key.colSpan === 4,
                'col-span-5': key.colSpan === 5,
                'col-span-6': key.colSpan === 6,
                'col-span-7': key.colSpan === 7,
                'col-span-8': key.colSpan === 8,
                'col-span-9': key.colSpan === 9,
                'col-span-10': key.colSpan === 10,
                'col-span-11': key.colSpan === 11,
                'col-span-30': key.colSpan === 30,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default KeyboardLayout
