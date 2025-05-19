// components/customKeyboard/modals/steps/StepBarebone.tsx
import { HexColorPicker } from 'react-colorful'
import { useState, useEffect } from 'react'

interface StepBareboneProps {
  layout: '풀배열' | '텐키리스'
  setLayout: (layout: '풀배열' | '텐키리스') => void
  material: '금속' | '플라스틱'
  setMaterial: (material: '금속' | '플라스틱') => void
  outerColor: string
  setOuterColor: (color: string) => void
  layoutOptions: { id: number; name: string }[]
  materialOptions: { id: number; name: string }[]
}

const StepBarebone = ({
  layout,
  setLayout,
  material,
  setMaterial,
  outerColor,
  setOuterColor,
  layoutOptions,
  materialOptions,
}: StepBareboneProps) => {
  const [inputValue, setInputValue] = useState(outerColor.replace('#', '').toUpperCase())

  useEffect(() => {
    setInputValue(outerColor.replace('#', '').toUpperCase())
  }, [outerColor])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setInputValue(value)
    if (/^[0-9A-F]{6}$/.test(value)) {
      setOuterColor(`#${value}`)
    }
  }

  const getButtonStyle = (selected: boolean) => {
    return selected
      ? 'border-tadak-primary bg-tadak-light-primary text-tadak-primary'
      : 'border-tadak-dark-gray text-tadak-dark-gray hover:border-tadak-primary hover:bg-tadak-light-gray hover:text-tadak-primary'
  }

  return (
    <div className="w-full flex flex-col gap-8 text-left">
      {/* 배열 선택 */}
      <div>
        <h3 className="text-xl font-semibold mb-2">배열</h3>
        <div className="flex gap-4 mb-2">
          {layoutOptions.map((option) => (
            <button
              key={option.id}
              className={`w-72 h-12 text-base font-medium rounded-lg border transition-colors ${getButtonStyle(
                layout === option.name
              )}`}
              onClick={() => setLayout(option.name as '풀배열' | '텐키리스')}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* 재질 선택 */}
      <div>
        <h3 className="text-xl font-semibold mb-2">외관 재질</h3>
        <div className="flex gap-4 mb-2">
          {materialOptions.map((option) => (
            <button
              key={option.id}
              className={`w-72 h-12 text-base font-medium rounded-lg border transition-colors ${getButtonStyle(
                material === option.name
              )}`}
              onClick={() => setMaterial(option.name as '금속' | '플라스틱')}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* 색상 선택 */}
      <div>
        <h3 className="text-xl font-semibold mb-2">외관 색상</h3>
        <div className="flex flex-col items-center gap-2">
          <div className="scale-95">
            <HexColorPicker color={outerColor} onChange={setOuterColor} />
          </div>
          <input
            value={inputValue}
            onChange={handleInputChange}
            maxLength={6}
            className="border border-tadak-dark-gray bg-tadak-light-gray text-base font-medium rounded-lg px-4 py-1 text-center w-52"
          />
        </div>
      </div>
    </div>
  )
}

export default StepBarebone