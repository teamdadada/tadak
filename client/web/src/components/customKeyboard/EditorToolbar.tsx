// src/components/customKeyboard/EditorToolbar.tsx
import { Button } from '@/components/ui/button'

import { ReactComponent as MoveIcon } from '@/assets/icons/move.svg'
import { ReactComponent as RotateHorizontalIcon } from '@/assets/icons/rotate-horizontal.svg'
import { ReactComponent as RotateVerticalIcon } from '@/assets/icons/rotate-vertical.svg'

const EditorToolbar = () => {
  return (
    <div className="flex gap-3">
      {/* 이동 */}
      <Button variant="outline" size="icon" className="rounded-full flex items-center justify-center">
        <MoveIcon className="w-8 h-8" />
      </Button>

      {/* 수평 회전 */}
      <Button variant="outline" size="icon" className="rounded-full flex items-center justify-center">
        <RotateHorizontalIcon className="w-6 h-6" />
      </Button>

      {/* 수직 회전 */}
      <Button variant="outline" size="icon" className="rounded-full flex items-center justify-center">
        <RotateVerticalIcon className="w-8 h-8" />
      </Button>
    </div>
  )
}

export default EditorToolbar