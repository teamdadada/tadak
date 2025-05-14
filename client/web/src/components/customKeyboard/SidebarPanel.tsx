import { useState } from 'react'
import TabMenu from './TabMenu'
import ItemGrid from './ItemGrid'
import { useKeyboardList } from '@/hooks/useKeyboard'
import { useBackgroundList } from '@/hooks/useBackground'
import type { KeyboardSummary } from '@/types/keyboard'
import type { BackgroundImage } from '@/types/background'

const SidebarPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0) // 0: 키보드, 1: 데스크
  const itemType = selectedIndex === 0 ? 'keyboard' : 'desk'

  const {
    data: keyboards = [],
    isLoading: isKeyboardLoading,
  } = useKeyboardList()

  const {
    data: backgrounds = [],
    isLoading: isBackgroundLoading,
  } = useBackgroundList()

  // 렌더링할 데이터 구성
  const items =
    selectedIndex === 0
      ? (keyboards as KeyboardSummary[]).map((k: KeyboardSummary) => ({
          id: k.keyboardId,
          name: k.name,
          imageUrl: k.thumbnailUrl,
        }))
      : (backgrounds as BackgroundImage[])
          .filter((b: BackgroundImage) => !b.isDefault) // 기본 배경 제외하고 렌더링
          .map((b: BackgroundImage) => ({
            id: b.backgroundId,
            name: '', // 배경은 이름 없음
            imageUrl: b.url,
          }))

  const isLoading = selectedIndex === 0 ? isKeyboardLoading : isBackgroundLoading

  return (
    <div className="flex flex-col h-full">
      {/* 제목 */}
      <h2 className="text-lg font-semibold mb-2">타닥 서랍장</h2>

      {/* 탭 메뉴 */}
      <TabMenu selectedIndex={selectedIndex} onChange={setSelectedIndex} />

      {/* 아이템 리스트 */}
      <div className="mt-4 flex-1 overflow-y-auto max-h-[408px] scrollbar-hide">
        {isLoading ? (
          <p className="text-center text-gray-400 text-sm">불러오는 중...</p>
        ) : (
          <ItemGrid items={items} itemType={itemType}/>
        )}
      </div>
    </div>
  )
}

export default SidebarPanel