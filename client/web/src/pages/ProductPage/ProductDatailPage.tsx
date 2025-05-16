import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ReviewSection from '@/components/review/ReviewSection'
import ProductDetailTabs from '@/components/product/ProductDetailTabs'
import { getProductDetail } from '@/services/shopService'
import { ProductType } from '@/types/shop'
import ProductInfoBarebone from '@/components/product/ProductInfoBarebone'
import ProductInfoSwitch from '@/components/product/ProductInfoSwitch'
import ProductInfoKeycap from '@/components/product/ProductInfoKeycap'
import FavoriteButton from '@/components/product/FavoriteButton'
import PayLinkButton from '@/components/product/PayLinkButton'

const ProductDetailPage = () => {
  const { type, id } = useParams<{ type?: string; id?: string }>()

  // ProductType으로 타입 변환 시도
  const productType = type as ProductType
  const productId = id ? parseInt(id) : 0

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productType, productId],
    queryFn: () => getProductDetail(productType, productId),
    enabled: !!productType && !!productId,
  })

  if (isLoading) return <p>로딩 중...</p>
  if (isError || !data) return <p>에러 발생</p>

  const renderProductInfo = () => {
    switch (productType) {
      case 'BAREBONE':
        return <ProductInfoBarebone data={data} />
      case 'SWITCH':
        return <ProductInfoSwitch data={data} />
      case 'KEYCAP':
        return <ProductInfoKeycap data={data} />
      default:
        return <p>유효하지 않은 제품 타입</p>
    }
  }

  return (
    <div className="flex flex-col max-w-6xl gap-8 p-6 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <img
            src={data.thumbnail}
            alt={data.name}
            className="w-4/5 mx-auto rounded-lg md:max-w-[500px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8 flex-1 md:pr-8">
          {renderProductInfo()}
          <div className="w-full flex flex-row gap-6 p-4">
            <div className="w-1/2">
              <FavoriteButton productId={productId} />
            </div>
            <div className="w-1/2">
              <PayLinkButton href={data.url} />
            </div>
          </div>
        </div>
      </div>
      <ReviewSection product={data} />
      <ProductDetailTabs imageUrl={data.detailImage} />
    </div>
  )
}

export default ProductDetailPage
