interface CheckboxGroupProps {
  title: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

const CheckboxGroup = ({
  title,
  options,
  selected = [],
  onChange,
}: CheckboxGroupProps) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
      <h3 className="mb-1 font-medium min-w-[80px] md:mb-0">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup
