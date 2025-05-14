// src/components/customKeyboard/TabMenu.tsx
import Tabs from '@/components/ui/Tabs'

interface TabMenuProps {
  selectedIndex: number
  onChange: (index: number) => void
}

const TabMenu = ({ selectedIndex, onChange }: TabMenuProps) => {
  const tabLabels = ['키보드', '데스크']

  return (
    <Tabs
      items={tabLabels}
      selectedIndex={selectedIndex}
      onChange={onChange}
      tabWidth={100}
      indicatorWidth={100}
      indicatorHeight={2}
      tabClassName="text-base"
    />
  )
}

export default TabMenu
