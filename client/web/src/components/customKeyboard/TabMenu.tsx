// src/components/customKeyboard/TabMenu.tsx
import { useState } from 'react'
import Tabs from '@/components/ui/Tabs'

const TabMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabLabels = ['키보드', '데스크']

  return (
    <Tabs
      items={tabLabels}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      tabWidth={100}
      indicatorWidth={100}
      indicatorHeight={2}
      tabClassName="text-base"
    />
  )
}

export default TabMenu
