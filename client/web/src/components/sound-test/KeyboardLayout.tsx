import Key from './key'
import { keyboardLayout } from './keyboardData'

interface KeyboardLayoutProps {
  activeKeys: string[]
  onKeyClick?: (keyCode: string) => void
}

const KeyboardLayout = ({ activeKeys, onKeyClick }: KeyboardLayoutProps) => {
  return (
    <div className="keyboard-container space-y-2 p-4">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-2 justify-center">
          {row.map((key) => (
            <Key
              key={key.code}
              keyCode={key.code}
              label={key.label}
              width={key.width}
              isFlexible={key.isFlexible}
              isActive={activeKeys.includes(key.code)}
              onClick={() => onKeyClick?.(key.code)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default KeyboardLayout
