import { ImageOff } from 'lucide-react'

interface ProductDetailTabsProps {
  imageUrl: string | null
}

const ProductDetailTabs = ({ imageUrl }: ProductDetailTabsProps) => {
  return (
    <div className="mt-2">
      <div className="relative flex border-b border-tadak-gray">
        <h2 className="py-2 w-[88px] text-xl font-semibold text-center">
          제품상세
        </h2>
        <div className="absolute bottom-0 rounded z-1 bg-tadak-primary h-[2px] w-[88px]" />
      </div>
      <div className="px-8 py-2">
        {imageUrl ? (
          <div className="px-24">
            <img src={imageUrl} alt="상세 이미지" className="w-full mt-4" />
          </div>
        ) : (
          // 이미지가 없을 경우 안내 문구
          <div className="flex flex-col items-center justify-center w-full py-16 my-4 bg-tadak-light-gray/20 rounded-lg border border-dashed border-tadak-gray/30">
            <ImageOff className="w-16 h-16 text-tadak-gray/50 mb-4" />
            <p className="text-center text-tadak-dark-gray">
              <span className="block font-medium mb-1">
                상세 이미지가 없습니다
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailTabs
