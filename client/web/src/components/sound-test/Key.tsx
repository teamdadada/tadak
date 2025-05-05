interface KeyProps {
  keyCode: string
  label: string
  width?: number
  isFlexible?: boolean
  isActive?: boolean
  onClick?: () => void
}

const Key = ({
  keyCode,
  label,
  width = 1,
  isFlexible = false,
  isActive = false,
  onClick,
}: KeyProps) => {
  const styleObj = isFlexible ? { flexGrow: 1 } : { width: `${width * 4}rem` }

  return (
    <button
      className={`
        h-14 flex pt-1 justify-center text-sm font-medium rounded
        ${
          isActive
            ? 'bg-tadak-primary text-tadak-white'
            : 'bg-tadak-white text-tadak-black'
        }
        transition-all duration-150
      `}
      style={{
        ...styleObj,
        boxShadow: '4px 4px 22.3px 0px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
      data-key-code={keyCode}
    >
      {label}
    </button>
  )
}

export default Key
