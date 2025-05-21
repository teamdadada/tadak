import Tabs from '@/components/ui/Tabs'
import { useState } from 'react'
import { Play } from 'lucide-react'
import { useSoundStore } from '@/store/soundStore'

enum SwitchType {
  Clicky = '일반축',
  Silent = '저소음축',
}

const switchKeyMap: Record<SwitchType, string[]> = {
  [SwitchType.Clicky]: [
    'G PRO 2.0 적축',
    'G PRO 2.0 청축',
    'G PRO 2.0 갈축',
    'G PRO 2.0 황축',
    'G PRO 2.0 백축',
    'G PRO 2.0 흑축',
    'G PRO 2.0 은축',
  ],
  [SwitchType.Silent]: [
    '저소음 적축',
    '저소음 갈축',
    '저소음 황축',
    '저소음 백축',
    '저소음 흑축',
  ],
}

const SideTab = () => {
  const switchOptions = Object.values(SwitchType)

  const selectedSoundKey = useSoundStore((state) => state.selectedSoundKey)
  const setSelectedSoundKey = useSoundStore(
    (state) => state.setSelectedSoundKey,
  )

  const [selectedSwitchType, setSelectedSwitchType] = useState<SwitchType>(
    SwitchType.Clicky,
  )

  const keyList = switchKeyMap[selectedSwitchType]

  return (
    <div className="p-4">
      <Tabs
        items={switchOptions}
        selectedIndex={switchOptions.indexOf(selectedSwitchType)}
        onChange={(i) => {
          const newType = switchOptions[i] as SwitchType
          setSelectedSwitchType(newType)

          const firstKeyOfNewType = switchKeyMap[newType][0]
          setSelectedSoundKey(firstKeyOfNewType)
        }}
        width="100%"
        tabWidth="50%"
        tabClassName="text-base"
      />

      <ul className="mt-4">
        {keyList.map((key) => (
          <li
            key={key}
            onClick={() => {
              setSelectedSoundKey(key)
            }}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-tadak-light-gray text-tadak-black text-[15px]"
          >
            <span className={key === selectedSoundKey ? 'font-semibold' : ''}>
              {key === selectedSoundKey ? '✓ ' : ''}
              {key}
            </span>
            <Play className="w-4 h-4 fill-tadak-black" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideTab
