import noImage from '@/assets/images/no_image.png'
import { Product } from '@/types/product'

interface FinalProductListProps {
  bareboneProduct: Product | null
  switchProduct: Product | null
  keycapProduct: Product | null
  layout: string
  material: string
  outerColor: string
  switchType: string
  basicColor: string
  pointOption: 'none' | 'set' | 'custom'
  customKeyMap: Record<string, string>
}

const FinalProductList = ({
  bareboneProduct,
  switchProduct,
  keycapProduct,
  layout,
  material,
  outerColor,
  switchType,
  basicColor,
  pointOption,
  customKeyMap,
}: FinalProductListProps) => {
  const customKeycapCount =
    pointOption === 'custom' ? Object.keys(customKeyMap).length : 0

  const additionalPrice =
    pointOption === 'set'
      ? 5500
      : pointOption === 'custom'
      ? customKeycapCount * 500
      : 0

  const totalPrice =
    (bareboneProduct?.price || 0) +
    (switchProduct?.price || 0) +
    (keycapProduct?.price || 0) +
    additionalPrice

  const renderItem = (label: string, product: Product | null, step:number) => (
    <div className="flex gap-4 items-start py-1">
      <div className="w-28 h-28 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={product?.imageUrl || noImage}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold">{label}</p>

        {/* 설명 한 줄 */}
        <p className="font-light text-tadak-dark-gray mt-1">
          {step === 0
            ? `${layout || '-'} / ${material || '-'} / ${outerColor?.toUpperCase()}`
            : step === 1
            ? `${switchType || '-'}`
            : `${basicColor?.toUpperCase()} / 포인트 키캡 ${
                pointOption === 'none'
                  ? 'x'
                  : `o / ${pointOption === 'custom' ? '내 맘대로 구성' : '세트 구성'}`
              }`}
        </p>

        {/* 키별 색상 정보 줄 */}
        {step === 2 && pointOption !== 'none' && Object.keys(customKeyMap).length > 0 && (
          <p className="font-light text-tadak-dark-gray text-sm mt-1 truncate overflow-hidden whitespace-nowrap max-w-[340px] min-h-[20px]">
            {Object.entries(customKeyMap)
              .map(([key, color]) => `${key.toUpperCase()}:${color.toUpperCase()}`)
              .join(' / ')}
          </p>
        )}

        {/* 수량 */}
        <p
          className={`font-light text-tadak-dark-gray text-sm ${
            step === 2 ? 'mt-4' : 'mt-8'
          }`}
        >
          {step === 2 && pointOption === 'custom' ? `${customKeycapCount}개` : '1개'}
        </p>
      </div>
      <div className="text-base font-semibold mt-1 whitespace-nowrap">
        {(
          (product?.price || 0) +
          (step === 2 ? additionalPrice : 0)
        ).toLocaleString()}
        원
      </div>
    </div>
  )

  return (
    <div className="w-full p-4 flex flex-col gap-3 bg-white rounded-lg shadow text-sm mb-16">
      <div className="flex flex-col gap-2">
        {renderItem('타닥 베어본', bareboneProduct, 0)}
        {renderItem('타닥 스위치', switchProduct, 1)}
        {renderItem('타닥 키캡', keycapProduct, 2)}
      </div>

      {/* 총 가격 */}
      <div className="flex items-center justify-between pt-4 border-t text-lg font-semibold mb-1">
        <p className="ml-1">총 합계</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </div>
    </div>
  )
}

export default FinalProductList