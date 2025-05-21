import noImage from '@/assets/images/no_image.png'
import { Product } from '@/types/product'

interface ProductSummaryProps {
  step: number // 0: 베어본, 1: 스위치, 2: 키캡
  layout?: string
  material?: string
  outerColor: string
  type?: string
  basicColor?: string
  pointOption?: 'none' | 'set' | 'custom'
  customKeyMap?: Record<string, string>
  bareboneProduct?: Product | null
  switchProduct?: Product | null
  keycapProduct?: Product | null
}

const ProductSummary = ({
  step,
  layout,
  material,
  outerColor,
  type,
  basicColor,
  pointOption = 'none',
  customKeyMap = {},
  bareboneProduct,
  switchProduct,
  keycapProduct,
}: ProductSummaryProps) => {
  const activeProduct =
    step === 0 ? bareboneProduct : step === 1 ? switchProduct : keycapProduct

  const customKeycapCount =
    step === 2 && pointOption === 'custom'
      ? Object.keys(customKeyMap).length
      : 0

  const additionalPrice =
    step === 2
      ? pointOption === 'set'
        ? 5500
        : pointOption === 'custom'
        ? customKeycapCount * 500
        : 0
      : 0

  const totalPrice =
    (bareboneProduct?.price || 0) +
    (switchProduct?.price || 0) +
    (keycapProduct?.price || 0) +
    additionalPrice

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white text-sm">
      {/* 상품 정보 */}
      <div className="flex items-start gap-6">
        {/* 썸네일 */}
        <div className="w-28 h-28 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={activeProduct?.imageUrl || noImage}
            alt="썸네일"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-start justify-between">
            <p className="text-lg font-bold">
              {activeProduct?.name ||
                (step === 0
                  ? '타닥 베어본'
                  : step === 1
                  ? '타닥 스위치'
                  : '타닥 키캡')}
            </p>
            <button className="text-sm text-tadak-primary border border-tadak-primary px-2 py-1 rounded-md hover:bg-tadak-light-primary">
              상품 변경
            </button>
          </div>
          <p className="text-gray-400">
            {step === 0
              ? `${layout || '-'} / ${material || '-'} / ${outerColor?.toUpperCase()}`
              : step === 1
              ? `${type || '-'}`
              : `${basicColor?.toUpperCase()} / 포인트 키캡 ${
                  pointOption === 'none'
                    ? 'x'
                    : `o / ${pointOption === 'custom' ? '내 맘대로 구성' : '세트 구성'}`
                }`}
          </p>

          {/* 키별 색상 정보 줄 */}
          <p className="text-gray-400 text-sm truncate overflow-hidden whitespace-nowrap max-w-[380px] min-h-[20px]">
            {step === 2 && pointOption !== 'none' && Object.keys(customKeyMap).length > 0
              ? Object.entries(customKeyMap)
                  .map(([key, color]) => `${key.toUpperCase()}:${color.toUpperCase()}`)
                  .join(' / ')
              : ''}
          </p>

          <div className="flex justify-between mt-1">
            <p className="text-gray-400">
              {step === 2 && pointOption === 'custom'
                ? `${customKeycapCount}개`
                : '1개'}
            </p>
            <p className="text-lg font-semibold text-right">
              {(step === 0
                ? bareboneProduct?.price
                : step === 1
                ? switchProduct?.price
                : (keycapProduct?.price || 0) + additionalPrice
              )?.toLocaleString() || '0'}원
            </p>
          </div>
        </div>
      </div>

      {/* 총 가격: 베어본 + 스위치 + 키캡 + 추가요금 */}
      <div className="border-t pt-2 pl-2 flex items-center justify-between text-lg font-bold mt-2">
        <p>총 가격</p>
        <p>
          {totalPrice.toLocaleString()}
          <span className="text-base font-medium">원</span>
        </p>
      </div>
    </div>
  )
}

export default ProductSummary