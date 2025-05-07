import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface PriceFilterProps {
  min?: number
  max?: number
  onChange?: (min?: number, max?: number) => void
}

const PriceFilter = ({ min, max, onChange }: PriceFilterProps) => {
  const [minInput, setMinInput] = useState<number | undefined>(min)
  const [maxInput, setMaxInput] = useState<number | undefined>(max)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = () => {
    if (
      minInput !== undefined &&
      maxInput !== undefined &&
      maxInput < minInput
    ) {
      setError('최대값은 최소값보다 커야 합니다.')
      return
    }

    setError(null) // 오류 초기화
    if (onChange) {
      onChange(minInput, maxInput)
    }
  }

  useEffect(() => {
    setMinInput(min)
    setMaxInput(max)
  }, [min, max])

  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
      <h3 className="mb-1 font-medium min-w-[80px] md:mb-0">가격대</h3>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="최소"
          value={minInput ?? ''}
          onChange={(e) =>
            setMinInput(e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-20"
        />
        <span>~</span>
        <Input
          type="number"
          placeholder="최대"
          value={maxInput ?? ''}
          onChange={(e) =>
            setMaxInput(e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-20"
        />
        <Button variant="default" size="default" onClick={handleSearch}>
          검색
        </Button>
      </div>
      {error && <p className="mt-1 text-sm text-tadak-warning">{error}</p>}
    </div>
  )
}

export default PriceFilter
