import { KeyboardDetailResponse } from '@/types/keyboard'
import { X } from 'lucide-react'
import ComponentCard from './ComponentCard'
import { useQuery } from '@tanstack/react-query'
import { fetchKeyboardDetail } from '@/services/keyboardService'
import { useKeyboardOptions } from '@/hooks/useKeyboard'

interface KeyboardDetailModalProps {
  keyboardId: number
  onClose: () => void
}

const KeyboardDetailModal = ({
  keyboardId,
  onClose,
}: KeyboardDetailModalProps) => {
  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery<KeyboardDetailResponse>({
    queryKey: ['keyboardDetail', keyboardId],
    queryFn: () => fetchKeyboardDetail(keyboardId),
  })

  const { data: keyboardOptions } = useKeyboardOptions()

  const getOptionName = (
    list: { id: number; name: string }[] | undefined,
    id: number | undefined,
  ) => list?.find((item) => item.id === id)?.name || '-'

  if (isLoading || !detail) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="p-8 bg-white rounded-lg shadow">로딩 중...</div>
      </div>
    )
  }

  if (isError) return <div>상세정보 불러오기에 실패했어요 🥲</div>

  const keycapBasePrice = detail.selectedProducts.keycap.price
  const pointKeyCount = Object.keys(detail.colors.keycap.pointColors).length
  const pointKeyPrice = 500

  const keycapTotalPrice = keycapBasePrice + pointKeyCount * pointKeyPrice

  const totalPrice =
    detail.selectedProducts.barebone.price +
    detail.selectedProducts.switch.price +
    keycapTotalPrice

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-screen-md max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute text-gray-400 top-4 right-4 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* 키보드 이름 */}
        <h1 className="mb-4 text-2xl font-bold">{detail.name}</h1>

        {/* 썸네일 */}
        <img
          src={detail.thumbnailUrl}
          alt="keyboard-thumbnail"
          className="object-contain w-full h-64 mb-6 bg-gray-100 rounded"
        />

        {/* 구성 요소 카드들 */}
        <div className="flex flex-col gap-4 mb-6">
          <ComponentCard
            label={detail.selectedProducts.barebone.name}
            product={detail.selectedProducts.barebone}
            description={`${getOptionName(keyboardOptions?.barebone.layout, detail.options[0]?.bareboneOption.layout)} / ${getOptionName(keyboardOptions?.barebone.material, detail.options[0]?.bareboneOption.material)} / ${detail.colors.outerColor.toUpperCase()}`}
          />
          <ComponentCard
            label={detail.selectedProducts.switch.name}
            product={detail.selectedProducts.switch}
            description={`${getOptionName(keyboardOptions?.switch.type, detail.options[0]?.switchOption.type)}`}
          />
          <ComponentCard
            label={detail.selectedProducts.keycap.name}
            product={detail.selectedProducts.keycap}
            description={`기본색 ${detail.colors.keycap.basicColor.toUpperCase()}`}
            customKeyMap={detail.colors.keycap.pointColors}
          />
        </div>

        {/* 총합 */}
        <div className="flex justify-between pt-4 text-lg font-semibold border-t">
          <span>총 합계</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  )
}

export default KeyboardDetailModal
