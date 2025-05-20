// components/customKeyboard/modals/steps/StepSwitch.tsx
import { useEffect, useState } from 'react'
import { ReactComponent as SoundIcon } from '@/assets/icons/sound.svg'
import { KeyboardOptionItem } from '@/types/keyboard'

interface StepSwitchProps {
  switchOptions: KeyboardOptionItem[]
  onSelect: (id: number, name: string) => Promise<void>
  selectedName: string
}

const StepSwitch = ({ switchOptions, onSelect, selectedName }: StepSwitchProps) => {
  const [selected, setSelected] = useState<string>(selectedName)

  const switchTypeToSoundMap: Record<string, string> = {
    청축: '/sounds/gpro2_blue_normal.mp3',
    적축: '/sounds/gpro2_red_normal.mp3',
    갈축: '/sounds/gpro2_brown_normal.mp3',
    흑축: '/sounds/gpro2_black_normal.mp3',
  }

  const getButtonStyle = (type: string) => {
    return selected === type
      ? 'border-tadak-primary bg-tadak-light-primary text-tadak-primary'
      : 'border-tadak-dark-gray text-tadak-dark-gray hover:border-tadak-primary hover:bg-tadak-light-gray hover:text-tadak-primary'
  }

  const playSound = (type: string) => {
    const sound = switchTypeToSoundMap[type]
    if (!sound) return
    const audio = new Audio(sound)
    audio.play().catch((err) => {
      console.error(`🎧 ${type} 소리 재생 실패`, err)
    })
  }

  useEffect(() => {
    setSelected(selectedName)

    // 초기 로딩 시에도 onSelect 호출
    const initialize = async () => {
      const matched = switchOptions.find((opt) => opt.name === selectedName)
      if (matched) {
        await onSelect(matched.id, matched.name)
      }
    }
  
    initialize()
  }, [selectedName, switchOptions])

  return (
    <div className="w-full flex flex-col gap-4 text-left mb-40">
      <h3 className="text-xl font-semibold">스위치</h3>

      <div className="grid grid-cols-2 gap-8">
        {/* 축 종류 */}
        <div>
          <div className="flex justify-center border-b pb-2 mb-4">
            <p className="text-lg font-semibold">축 종류</p>
          </div>
          <div className="flex flex-col gap-6 text-base font-medium">
            {switchOptions.map((opt) => (
              <button
                key={opt.id}
                className={`w-68 h-12 text-base font-medium rounded-lg border transition-colors ${getButtonStyle(opt.name)}`}
                onClick={() => {
                  setSelected(opt.name)
                  onSelect(opt.id, opt.name)
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* 타건 소리 */}
        <div>
          <div className="flex justify-center border-b pb-2 mb-4">
            <p className="text-lg font-semibold">타건 소리</p>
          </div>
          <div className="flex flex-col gap-6">
            {switchOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => playSound(opt.name)}
                className="w-68 h-12 flex items-center justify-center
                  rounded-lg border border-tadak-dark-gray text-tadak-dark-gray
                  transition-colors hover:border-tadak-secondary hover:bg-tadak-light-secondary hover:text-tadak-secondary
                  active:scale-95 active:bg-tadak-secondary active:text-tadak-white"
              >
                <SoundIcon className="w-8 h-10" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepSwitch