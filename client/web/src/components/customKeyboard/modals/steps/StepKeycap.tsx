// components/customKeyboard/modals/steps/StepKeycap.tsx
import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import Tabs from '@/components/ui/Tabs'
import { fetchKeycapProduct } from '@/services/keyboardService'
import { Product } from '@/types/product'

interface StepKeycapProps {
  basicColor: string
  setBasicColor: (color: string) => void
  pointColor: string
  setPointColor: (color: string) => void
  pointOption: 'none' | 'set' | 'custom'
  setPointOption: (option: 'none' | 'set' | 'custom') => void
  focusedKey: string | null
  setFocusedKey: (key: string | null) => void
  customKeyMap: Record<string, string>
  setCustomKeyMap: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onProductChange: (product: Product | null) => void
}

const StepKeycap = ({
  basicColor,
  setBasicColor,
  pointColor,
  setPointColor,
  pointOption,
  setPointOption,
  focusedKey,
  setFocusedKey,
  customKeyMap,
  setCustomKeyMap,
  onProductChange,
}: StepKeycapProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [inputValue, setInputValue] = useState(basicColor.replace('#', '').toUpperCase())
  const [pointInput, setPointInput] = useState(pointColor.replace('#', '').toUpperCase())

  const defaultKeys = ['W', 'A', 'S', 'D', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Esc']

  // 기본 키캡 색상 input 동기화
  useEffect(() => {
    setInputValue(basicColor.replace('#', '').toUpperCase())
  }, [basicColor])

  // 포인트 키캡 색상 input 동기화
  useEffect(() => {
    setPointInput(pointColor.replace('#', '').toUpperCase())
  }, [pointColor])

  useEffect(() => {
    fetchKeycapProduct()
      .then(res => onProductChange(res?.[0] ?? null))
      .catch(() => onProductChange(null))
  }, [onProductChange])

  // 탭 전환에 따라 포인트 구성 방식 변경
  const handlePointOptionChange = (option: 'none' | 'set' | 'custom') => {
    setPointOption(option)
    setFocusedKey(null)
    setPointColor('#FFFFFF')
    setPointInput('FFFFFF')

    if (option === 'none') {
      setCustomKeyMap({})
    }

    if (option === 'none') {
      setCustomKeyMap({})
    } else if (option === 'set') {
      const newMap: Record<string, string> = {}
      defaultKeys.forEach(key => {
        newMap[key] = '#FFFFFF'
      })
      setCustomKeyMap(newMap)
    } else if (option === 'custom') {
      setCustomKeyMap({})
    }
  }

  // focusedKey 색상 동기화
  useEffect(() => {
    if (!focusedKey) return
    const color = customKeyMap[focusedKey] ?? basicColor
    setPointColor(color)
    setPointInput(color.replace('#', '').toUpperCase())
  }, [focusedKey, customKeyMap, basicColor])

  // set일 때 pointColor 바뀌면 customKeyMap도 갱신
  useEffect(() => {
    if (pointOption === 'set') {
      setCustomKeyMap(prev => {
        const updatedMap = { ...prev }
        defaultKeys.forEach(key => {
          updatedMap[key] = pointColor
        })
        return updatedMap
      })
    }
  }, [pointColor, pointOption])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setInputValue(val)
    if (/^[0-9A-F]{6}$/.test(val)) {
      setBasicColor(`#${val}`)
    }
  }

  const handlePointInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setPointInput(val)
    if (/^[0-9A-F]{6}$/.test(val) && focusedKey) {
      const hex = `#${val}`
      setPointColor(hex)
      setCustomKeyMap((prev) => ({ ...prev, [focusedKey]: hex }))
    }
  }

  const handlePointColorChange = (color: string) => {
    setPointColor(color)
    setPointInput(color.replace('#', '').toUpperCase())
    if (focusedKey) {
      setCustomKeyMap((prev) => ({ ...prev, [focusedKey]: color }))
    }
  }

  const getPointTabStyle = (active: boolean) =>
    active
      ? 'border-tadak-primary bg-tadak-light-primary text-tadak-primary'
      : 'border-tadak-dark-gray text-tadak-dark-gray hover:border-tadak-primary hover:bg-tadak-light-gray hover:text-tadak-primary'

  return (
    <div className="w-full flex flex-col gap-6 text-left">
      <Tabs
        items={['기본 키캡', '포인트 키캡']}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        tabWidth={100}
        indicatorWidth={100}
        indicatorHeight={2}
        tabClassName="text-base"
      />

      {selectedIndex === 0 && (
        <div className="flex flex-col gap-6 items-center mb-20">
          <div className="w-full text-sm rounded-lg bg-tadak-light-gray p-6 mb-3">
            <p className="text-base font-semibold mb-1">기본 키캡</p>
            <p className="text-sm font-light">기본 키캡의 색상을 선택하세요.</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="scale-95">
              <HexColorPicker color={basicColor} onChange={setBasicColor} />
            </div>
            <input
              value={inputValue}
              onChange={handleInputChange}
              maxLength={6}
              className="border border-tadak-dark-gray bg-tadak-light-gray text-base font-medium rounded-lg px-4 py-1 text-center w-52"
            />
          </div>
        </div>
      )}

      {selectedIndex === 1 && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 mb-2">
            <button
              className={`w-72 h-12 text-base font-medium rounded-lg border transition-colors ${getPointTabStyle(pointOption === 'none')}`}
              onClick={() => handlePointOptionChange('none')}
            >
              포인트 키캡 없음
            </button>
            <button
              className={`w-72 h-12 text-base font-medium rounded-lg border transition-colors ${getPointTabStyle(pointOption !== 'none')}`}
              onClick={() => handlePointOptionChange('set')}
            >
              포인트 키캡 추가
            </button>
          </div>

          {pointOption === 'none' ? (
            <div className="w-full p-1">
              <div className="w-full text-sm rounded-lg p-6 bg-tadak-light-gray">
                <p className="text-base font-semibold mb-1">포인트 키캡 없음</p>
                <p className="text-sm font-light">포인트 키캡을 추가하지 않고 기본 키캡만 사용할 수 있습니다.</p>
              </div>
              <div className="mb-72"></div>
            </div>
          ) : (
            <>
              <Tabs
                items={['세트 구성', '내 맘대로 구성']}
                selectedIndex={pointOption === 'set' ? 0 : 1}
                onChange={(i) => handlePointOptionChange(i === 0 ? 'set' : 'custom')}
                tabWidth={120}
                indicatorWidth={120}
                indicatorHeight={2}
                tabClassName="text-base text-tadak-dark-gray"
                indicatorClassName="bg-tadak-secondary"
              />

              <div className="w-full text-sm rounded-lg bg-tadak-light-gray p-6 mb-1">
                {pointOption === 'set' ? (
                  <div>
                    <p className="text-base font-semibold mb-1">세트 구성</p>
                    <p className="text-sm font-light">
                      W, A, S, D, 방향키, Esc, Enter, Space Bar{' '}
                      <span className="text-tadak-secondary font-semibold">(추가요금 +5,500원)</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-base font-semibold mb-1">내 맘대로 구성</p>
                    <p className="text-sm font-light">
                      바꾸고 싶은 키를 선택 후 원하는 색상으로 설정해주세요.
                      <span className="text-tadak-secondary font-semibold"> (추가요금 개당 +500원)</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="scale-90">
                  <HexColorPicker color={pointColor} onChange={handlePointColorChange} />
                </div>
                <input
                  value={pointInput}
                  onChange={handlePointInputChange}
                  maxLength={6}
                  className="border border-tadak-dark-gray bg-tadak-light-gray text-base font-medium rounded-lg px-4 py-1 text-center w-52"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default StepKeycap