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
    <div className="flex flex-col md:flex-row md:items-stretch bg-tadak-light-gray">
      <div className="px-3 py-2 md:flex md:items-center md:h-full md:min-h-full md:self-stretch">
        <h3 className="font-medium text-[15px] min-w-[80px]">가격대</h3>
      </div>

      <div className="w-full h-[1px] md:hidden"></div>

      <div className="hidden md:block md:w-[1px] md:h-auto md:self-stretch"></div>

      <div className="p-2 flex-1 bg-tadak-white">
        <div className="flex flex-1 lex-col sm:flex-row items-center gap-4">
          {/* 입력 필드 그룹 */}
          <div className="flex flex-row items-center gap-3 w-full sm:w-auto sm:flex-1">
            <div className="w-full">
              <Input
                type="number"
                placeholder="최소"
                value={minInput ?? ''}
                onChange={(e) =>
                  setMinInput(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className="rounded-none shadow-none w-full"
              />
            </div>
            <span className="mx-1">~</span>
            <div className="w-full">
              <Input
                type="number"
                placeholder="최대"
                value={maxInput ?? ''}
                onChange={(e) =>
                  setMaxInput(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className="rounded-none shadow-none w-full"
              />
            </div>
          </div>

          {/* 검색 버튼 */}
          <Button
            variant="default"
            size="default"
            onClick={handleSearch}
            className="bg-tadak-black rounded-sm shadow-none whitespace-nowrap w-12 sm:w-auto "
          >
            검색
          </Button>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="mt-1 text-xs text-tadak-warning">{error}</p>}
      </div>
    </div>
  )
}

export default PriceFilter
