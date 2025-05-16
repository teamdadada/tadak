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
          <div className="flex w-full m-4 text-sm text-center text-tadak-dark-gray">
            상세 이미지가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailTabs
