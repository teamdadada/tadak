// src/components/customKeyboard/DeskSection.tsx
import DeskCanvas from './DeskCanvas'
import ActionButtons from './ActionButtons'

const DeskSection = () => {
  return (
    <div className="flex flex-col h-[500px]">
      {/* 제목 */}
      <h2 className="text-lg font-semibold mb-3">나의 타닥 데스크</h2>

      {/* 캔버스 영역 */}
      <div className="relative border rounded-lg bg-white flex-1 h-[400px]">
        <DeskCanvas />
      </div>

      {/* 하단 버튼 */}
      <div className="mt-4 flex justify-between items-center">
        <ActionButtons />
      </div>
    </div>
  )
}

export default DeskSection