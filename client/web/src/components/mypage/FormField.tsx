import { InputHTMLAttributes, ChangeEvent } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  type: string
  value?: string | number | readonly string[] // value 속성 명시적 추가
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void // onChange 이벤트 핸들러 명시적 추가
  error?: string
  helpText?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  textClassName?: string
  disabled?: boolean
  labelWidth?: string
  inputWidth?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  helpText,
  className = '',
  labelClassName = '',
  inputClassName = '',
  textClassName = '',
  disabled = false,
  labelWidth = 'w-32',
  inputWidth = 'w-68',
  ...rest
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 lg:gap-4`}
      >
        {/* 라벨 */}
        <label
          htmlFor={name}
          className={`text-sm font-medium ${labelWidth} lg:shrink-0 ${labelClassName}`}
        >
          {label}
        </label>

        {/* 입력 필드 */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`text-sm px-6 py-3 border border-tadak-gray rounded-md focus:outline-none ${
            error ? 'border-red-500' : 'border-tadak-gray '
          } ${
            disabled
              ? 'border border-tadak-light-gray bg-tadak-light-gray text-tadak-dark-gray'
              : 'bg-white'
          } lg:${inputWidth} ${inputClassName}`}
          {...rest}
        />

        {/* 텍스트 */}
        <div className="ml-4 flex-1">
          {error ? (
            <p className={`text-xs text-red-500 ${textClassName}`}>{error}</p>
          ) : helpText ? (
            <p className={`text-xs text-gray-500 ${textClassName}`}>
              {helpText}
            </p>
          ) : (
            <p className="text-xs invisible lg:block hidden">다이</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormField
