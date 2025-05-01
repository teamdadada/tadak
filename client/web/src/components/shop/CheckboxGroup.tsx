interface CheckboxGroupProps {
  title: string
  options: string[]
}

const CheckboxGroup = ({ title, options }: CheckboxGroupProps) => (
  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
    <h3 className="mb-1 font-medium min-w-[80px] md:mb-0">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-1">
          <input type="checkbox" value={option} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
)

export default CheckboxGroup
