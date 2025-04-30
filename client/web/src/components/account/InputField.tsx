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
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-6 rounded-lg"
      />
    </>
  )
}

export default InputField
