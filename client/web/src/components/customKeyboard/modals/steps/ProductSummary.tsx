import noImage from '@/assets/images/no_image.png'
import { Product } from '@/types/product'

interface ProductSummaryProps {
  product?: Product | null
  layout: string
  material: string
  outerColor: string
}

const ProductSummary = ({
  product,
  layout,
  material,
  outerColor,
}: ProductSummaryProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-white text-sm">
      {/* 상품 정보 */}
      <div className="flex items-start gap-6">
        {/* 썸네일 */}
        <div className="w-28 h-28 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={product?.imageUrl || noImage}
            alt="썸네일"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-start justify-between">
            <p className="text-lg font-bold">{product?.name || '타닥 베어본'}</p>
            <button className="text-sm text-tadak-primary border border-tadak-primary px-2 py-1 rounded-md hover:bg-tadak-light-primary">
              상품 변경
            </button>
          </div>
          <p className="text-gray-400">
            {layout} / {material} / <span className="text-[#999]">{outerColor.toUpperCase()}</span>
          </p>
          <p className="text-gray-400">
            &nbsp;
          </p>
          <div className="flex justify-between mt-1">
            <p className="text-gray-400">1개</p>
            <p className="text-lg font-semibold text-right">
              {product?.price?.toLocaleString() || '35,000'}원
            </p>
          </div>
        </div>
      </div>

      {/* 총 가격 */}
      <div className="border-t pt-2 pl-2 flex items-center justify-between text-lg font-bold mt-2">
        <p>총 가격</p>
        <p>
          {product?.price?.toLocaleString() || '35,000'}
          <span className="text-base font-medium">원</span>
        </p>
      </div>
    </div>
  )
}

export default ProductSummary