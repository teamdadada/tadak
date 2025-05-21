import { useState } from 'react'
import TabMenu from './TabMenu'
import ItemGrid from './ItemGrid'
import { useKeyboardList } from '@/hooks/useKeyboard'
import { usePlacementList } from '@/hooks/usePlacement'
import { useUserStore } from '@/store/userStore'

import type { KeyboardSummary } from '@/types/keyboard'
import type { Placement } from '@/types/placement'

const SidebarPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0) // 0: 키보드, 1: 데스크
  const itemType = selectedIndex === 0 ? 'keyboard' : 'desk'

  const isLoggedIn = useUserStore((state) => state.getIsLoggedIn()) // 로그인 여부 확인

  const {
    data: keyboards = [],
    isLoading: isKeyboardLoading,
  } = isLoggedIn ? useKeyboardList() : { data: [], isLoading: false }

  // 로그인한 경우에만 placement API 호출
  const {
    data: placements = [],
    isLoading: isPlacementLoading,
    refetch: refetchPlacements,
  } = isLoggedIn ? usePlacementList() : { data: [], isLoading: false, refetch: () => {} }

  // 아이템 목록 구성
  const items =
    selectedIndex === 0
      ? (keyboards as KeyboardSummary[]).map((k) => ({
          id: k.keyboardId,
          name: k.name,
          imageUrl: k.thumbnailUrl,
        }))
      : (placements as Placement[]).map((p) => ({
          id: p.placementId,
          name: '',
          imageUrl: p.imageUrl,
          canDelete: p.canDelete,
        }))

  const isLoading =
    selectedIndex === 0 ? isKeyboardLoading : isLoggedIn ? isPlacementLoading : false

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">타닥 서랍장</h2>

      <TabMenu selectedIndex={selectedIndex} onChange={setSelectedIndex} />

      <div className="mt-4 flex-1 overflow-y-auto max-h-[408px] scrollbar-hide">
        {isLoading ? (
          <p className="text-center text-gray-400 text-sm">불러오는 중...</p>
        ) : (
          <ItemGrid
            items={items}
            itemType={itemType}
            refetchPlacements={isLoggedIn ? refetchPlacements : undefined}
          />
        )}
      </div>
    </div>
  )
}

export default SidebarPanel