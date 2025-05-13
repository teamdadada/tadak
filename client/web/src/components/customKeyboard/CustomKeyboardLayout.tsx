// src/components/customKeyboard/CustomKeyboardLayout.tsx
import DeskSection from './DeskSection'
import SidebarPanel from './SidebarPanel'

const CustomKeyboardLayout = () => {
  return (
    <div className="flex w-full max-w-screen-xl mx-auto gap-6 py-6">
      {/* 왼쪽: 내 타닥 데스크 - 유동 크기 */}
      <div className="flex-1 min-w-xl">
        <DeskSection />
      </div>

      {/* 오른쪽: 타닥 서랍장 - 최대 너비 제한 */}
      <div className="w-full max-w-xl flex-shrink-0">
        <SidebarPanel />
      </div>
    </div>
  )
}

export default CustomKeyboardLayout