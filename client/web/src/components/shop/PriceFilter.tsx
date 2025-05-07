import { useEffect, useState } from 'react'

interface PriceFilterProps {
  min?: number
  max?: number
  onChange?: (min?: number, max?: number) => void
}

const PriceFilter = ({ min, max, onChange }: PriceFilterProps) => {
  const [minInput, setMinInput] = useState<number | undefined>(min)
  const [maxInput, setMaxInput] = useState<number | undefined>(max)

  useEffect(() => {
    setMinInput(min)
    setMaxInput(max)
  }, [min, max])

  useEffect(() => {
    if (onChange && (minInput !== min || maxInput !== max)) {
      onChange(minInput, maxInput)
    }
  }, [minInput, maxInput, onChange])

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
      <h3 className="mb-1 font-medium min-w-[80px] md:mb-0">가격대</h3>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="최소"
          className="w-20 px-2 py-1 border rounded"
          value={minInput ?? ''}
          onChange={(e) =>
            setMinInput(e.target.value ? Number(e.target.value) : undefined)
          }
        />
        <span>~</span>
        <input
          type="number"
          placeholder="최대"
          className="w-20 px-2 py-1 border rounded"
          value={maxInput ?? ''}
          onChange={(e) =>
            setMaxInput(e.target.value ? Number(e.target.value) : undefined)
          }
        />
      </div>
    </div>
  )
}

export default PriceFilter
