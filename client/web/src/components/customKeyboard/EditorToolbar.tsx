import { Button } from '@/components/ui/button'
import { ReactComponent as MoveIcon } from '@/assets/icons/move.svg'
import { ReactComponent as RotateHorizontalIcon } from '@/assets/icons/rotate-horizontal.svg'
import { ReactComponent as RotateVerticalIcon } from '@/assets/icons/rotate-vertical.svg'
import { ReactComponent as SizeIcon } from '@/assets/icons/fullscreen.svg'
import { cn } from '@/lib/utils' // 클래스 병합 유틸

interface EditorToolbarProps {
  toggleTransform: () => void
  setRotationMode: (mode: 'horizontal' | 'vertical') => void
  setTransformMode: (mode: 'translate' | 'scale') => void
  isControlActive: boolean
  rotationMode: 'horizontal' | 'vertical' | null
  transformMode: 'translate' | 'scale'
}

const EditorToolbar = ({
  toggleTransform,
  setRotationMode,
  setTransformMode,
  isControlActive,
  rotationMode,
  transformMode,
}: EditorToolbarProps) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => setRotationMode('vertical')}
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full text-tadak-dark-gray',
          rotationMode === 'vertical' && 'border-tadak-secondary bg-tadak-light-secondary text-tadak-secondary'
        )}
      >
        <RotateVerticalIcon className="w-8 h-8" />
      </Button>

      <Button
        onClick={() => setRotationMode('horizontal')}
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full text-tadak-dark-gray',
          rotationMode === 'horizontal' && 'border-tadak-secondary bg-tadak-light-secondary text-tadak-secondary'
        )}
      >
        <RotateHorizontalIcon className="w-6 h-6" />
      </Button>
      
      {/* 크기 조정 모드 */}
      <Button
        onClick={() => {
          toggleTransform()
          setTransformMode('scale')
        }}
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full text-tadak-dark-gray',
          isControlActive && transformMode === 'scale' && 'border-tadak-secondary bg-tadak-light-secondary text-tadak-secondary'
        )}
      >
        <SizeIcon className="w-6 h-6" />
      </Button>

      {/* 이동 모드 */}
      <Button
        onClick={() => {
          toggleTransform()
          setTransformMode('translate')
        }}
        variant="outline"
        size="icon"
        className={cn(
          'rounded-full text-tadak-dark-gray',
          isControlActive && transformMode === 'translate' && 'border-tadak-secondary bg-tadak-light-secondary text-tadak-secondary'
        )}
      >
        <MoveIcon className="w-8 h-8" />
      </Button>
    </div>
  )
}

export default EditorToolbar