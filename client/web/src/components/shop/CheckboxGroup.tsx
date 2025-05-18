import { Checkbox } from '@/components/ui/checkbox'

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
  const handleToggle = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, value])
    } else {
      onChange(selected.filter((v) => v !== value))
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-stretch bg-tadak-light-gray border-b">
      <div className="p-2 px-3 md:flex md:items-center md:h-full md:min-h-full md:self-stretch">
        <h3 className="font-medium text-[15px] min-w-[80px]">{title}</h3>
      </div>

      <div className="w-full h-[1px] md:hidden"></div>

      <div className="hidden md:block md:w-[1px] md:h-auto md:self-stretch"></div>

      <div className="flex flex-wrap flex-1 px-1 bg-tadak-white">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 p-2 w-1/2 md:w-1/3 lg:w-1/5"
          >
            <Checkbox
              id={`checkbox-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={(checked) =>
                handleToggle(option, checked === true)
              }
              className="rounded-none data-[state=checked]:bg-tadak-secondary data-[state=checked]:border-tadak-secondary shadow-none border-tadak-gray "
            />
            <label
              htmlFor={`checkbox-${option}`}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup
