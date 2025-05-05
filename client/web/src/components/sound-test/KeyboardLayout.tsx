import Key from './key'
import { keyboardLayout } from './keyboardData'

interface KeyboardLayoutProps {
  activeKeys: string[]
}

const KeyboardLayout = ({ activeKeys }: KeyboardLayoutProps) => {
  return (
    <div className="keyboard-container space-y-2">
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
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default KeyboardLayout
