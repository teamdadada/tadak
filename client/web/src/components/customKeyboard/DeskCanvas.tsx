// src/components/customKeyboard/DeskCanvas.tsx
import EditorToolbar from './EditorToolbar'
import { ReactComponent as FullscreenIcon } from '@/assets/icons/fullscreen.svg'

const DeskCanvas = () => {
  return (
    <div className="relative w-full h-[400px]">
      {/* 실제 키보드 배치 캔버스 */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">키보드가 아직 없어요!</div>
      </div>

      {/* 회전/이동 버튼 */}
      <div className="absolute bottom-3 left-3 flex gap-2">
        <EditorToolbar />
      </div>

      {/* 전체화면 버튼 */}
      <button
        className="absolute top-3 right-3 border p-2 rounded-md hover:bg-gray-100"
        aria-label="전체화면"
      >
        <FullscreenIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default DeskCanvas