import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const ActionButtons = ({
  isDirty,
  onSave,
}: {
  isDirty: boolean
  onSave?: () => void
}) => {
  const handleShareClick = () => {
    toast.info('공유하기 기능은 곧 오픈될 예정이에요 🙌')
  }

  const handleSaveClick = () => {
    toast.info('저장 기능은 곧 오픈될 예정이에요 🙌')
    onSave?.()
  }

  const handleCancelClick = () => {
    toast.info('취소 기능은 곧 오픈될 예정이에요 🙌')
  }

  return (
    <div className="flex justify-between w-full gap-4">
      <div>
        <Button 
          className="bg-tadak-primary text-white hover:bg-orange-400"
          onClick={handleShareClick}
        >
          공유하기
        </Button>
      </div>

      <div className="flex gap-2">
        {isDirty && (
          <>
            <Button
              className="bg-tadak-secondary text-white hover:bg-green-600"
              onClick={handleSaveClick}
            >
              저장
            </Button>
            <Button
              variant="ghost"
              className="bg-tadak-gray text-white hover:bg-gray-400"
              onClick={handleCancelClick}
            >
              취소
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionButtons