import { forwardRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputFieldProps {
  id: string
  type: string
  label: string
  placeholder: string
  error?: string
}

const InputField = forwardRef<
  HTMLInputElement,
  InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ id, type, label, placeholder, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-4 h-24">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      <div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className="px-4 py-6 focus-visible:ring-tadak-secondary"
          {...props}
        />
        {error && (
          <p className="text-tadak-warning text-xs font-bold ml-1 mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  )
})

export default InputField
