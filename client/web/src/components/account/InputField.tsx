import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputFieldProps {
  label: string
  placeholder: string
}

const InputField = ({ label, placeholder }: InputFieldProps) => {
  return (
    <>
      <Label className="id">{label}</Label>
      <Input placeholder={placeholder} />
    </>
  )
}

export default InputField
