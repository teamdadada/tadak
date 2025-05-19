import { Button } from '@/components/ui/button'

const ActionButtons = ({
  isDirty,
  onSave,
}: {
  isDirty: boolean
  onSave?: () => void
}) => {
  return (
    <div className="flex justify-between w-full gap-4">
      <div>
        <Button className="bg-tadak-primary text-white hover:bg-orange-400">
          공유하기
        </Button>
      </div>

      <div className="flex gap-2">
        {isDirty && (
          <>
            <Button
              className="bg-tadak-secondary text-white hover:bg-green-600"
              onClick={onSave}
            >
              저장
            </Button>
            <Button
              variant="ghost"
              className="bg-tadak-gray text-white hover:bg-gray-400"
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