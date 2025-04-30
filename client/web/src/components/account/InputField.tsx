import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputFieldProps {
  id: string
  type: string
  label: string
  placeholder: string
}

const InputField = ({ id, type, label, placeholder }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-6 rounded-lg"
      />
    </div>
  )
}

export default InputField
