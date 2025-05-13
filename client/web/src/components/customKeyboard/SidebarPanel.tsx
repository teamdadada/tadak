import TabMenu from './TabMenu'
import ItemGrid from './ItemGrid'

const SidebarPanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* 제목 */}
      <h2 className="text-lg font-semibold mb-2">타닥 서랍장</h2>

      {/* 탭 메뉴 */}
      <TabMenu />

      {/* 아이템 리스트 */}
      <div className="mt-4 flex-1 overflow-y-auto max-h-[408px] scrollbar-hide">
        <ItemGrid />
      </div>
    </div>
  )
}

export default SidebarPanel