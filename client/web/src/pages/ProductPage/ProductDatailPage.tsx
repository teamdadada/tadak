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
import TopButton from '@/components/common/TopButton'
import Chatbot from '@/components/chatbot/Chatbot'

// 스켈레톤 UI 컴포넌트
const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col max-w-6xl gap-8 p-6 mx-auto mb-12 animate-pulse">
      <div className="flex flex-col gap-16 md:flex-row">
        {/* 이미지 스켈레톤 */}
        <div className="md:w-2/5 overflow-hidden">
          <div className="w-full h-80 md:h-96 bg-tadak-light-gray/70 rounded-lg"></div>
        </div>

        {/* 상품 정보 스켈레톤 */}
        <div className="flex flex-col justify-center gap-6 flex-1 md:pr-8">
          {/* 제품명 */}
          <div className="w-3/4 h-8 bg-tadak-light-gray/70 rounded-md"></div>

          {/* 가격 */}
          <div className="w-1/2 h-6 bg-tadak-light-gray/70 rounded-md"></div>

          {/* 속성 그룹 1 */}
          <div className="flex flex-row gap-1">
            <div className="w-1/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
            <div className="w-3/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
          </div>

          {/* 속성 그룹 2 */}
          <div className="flex flex-row gap-1">
            <div className="w-1/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
            <div className="w-3/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
          </div>

          {/* 속성 그룹 3 */}
          <div className="flex flex-row gap-1">
            <div className="w-1/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
            <div className="w-3/4 h-4 bg-tadak-light-gray/70 rounded-md"></div>
          </div>

          {/* 버튼 그룹 */}
          <div className="w-full flex flex-row gap-6 mt-4 p-4">
            <div className="w-1/2 h-10 bg-tadak-light-gray/70 rounded-md"></div>
            <div className="w-1/2 h-10 bg-tadak-light-gray/70 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 스켈레톤 */}
      <div className="w-full">
        <div className="h-6 w-24 bg-tadak-light-gray/70 rounded-md mb-4"></div>
        <div className="h-32 bg-tadak-light-gray/70 rounded-md"></div>
      </div>

      {/* 상세 정보 스켈레톤 */}
      <div className="w-full">
        <div className="h-6 w-24 bg-tadak-light-gray/70 rounded-md mb-4"></div>
        <div className="h-64 bg-tadak-light-gray/70 rounded-md"></div>
      </div>
    </div>
  )
}

// 에러 UI 컴포넌트
const ProductDetailError = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl gap-4 p-12 mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-tadak-warning"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <h2 className="text-xl font-semibold text-tadak-black">
        제품 정보를 불러올 수 없습니다
      </h2>
      <p className="text-tadak-dark-gray text-center">
        잠시 후 다시 시도하거나, 다른 제품을 확인해 보세요.
      </p>
    </div>
  )
}

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

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) return <ProductDetailSkeleton />

  // 에러 발생 시 에러 UI 표시
  if (isError || !data) return <ProductDetailError />

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
    <div className="flex flex-col max-w-6xl gap-8 p-6 mx-auto mb-12">
      <div className="flex flex-col gap-16 md:flex-row">
        <div className="md:w-2/5 overflow-hidden">
          <img
            src={data.thumbnail}
            alt={data.name}
            className="w-full mx-auto rounded-lg object-cover"
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

      <TopButton showBelow={1000} />
      <Chatbot />
    </div>
  )
}

export default ProductDetailPage
