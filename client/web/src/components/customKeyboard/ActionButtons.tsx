// src/components/customKeyboard/ActionButtons.tsx
import { Button } from '@/components/ui/button'

const ActionButtons = () => {
  return (
    <div className="flex justify-between w-full gap-4">
      {/* 왼쪽: 초기화 */}
      <div>
        <Button variant="outline" className="text-tadak-gray border-tadak-gray hover:bg-gray-100 hover:text-tadak-dark-gray">초기화</Button>
      </div>

      {/* 가운데: 공유하기 */}
      <div>
        <Button className="bg-tadak-primary text-white hover:bg-orange-400">공유하기</Button>
      </div>

      {/* 오른쪽: 저장, 취소 */}
      <div className="flex gap-2">
        <Button className="bg-tadak-secondary text-white hover:bg-green-600">저장</Button>
        <Button variant="ghost" className="bg-tadak-gray text-white hover:bg-gray-400">취소</Button>
      </div>
    </div>
  )
}

export default ActionButtons