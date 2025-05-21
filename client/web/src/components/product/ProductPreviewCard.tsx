import { Product } from '@/types/shop'
import defaultImage from '@/assets/images/logo.png'
import { Link } from 'react-router-dom'

interface ProductPreviewCardProps {
  product: Product
  linkable?: boolean
}

const ProductPreviewCard = ({
  product,
  linkable = false,
}: ProductPreviewCardProps) => {
  const content = (
    <div className="flex items-center gap-6 p-4 border-b border-tadak-light-gray">
      <img
        src={product.thumbnail || defaultImage}
        alt={product.name}
        className="w-16 h-16 rounded"
      />
      <div className="gap-2">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-tadak-black font-semibold">
          {typeof product.minPrice === 'number'
            ? `${product.minPrice.toLocaleString()}원`
            : '가격 정보 없음'}
        </p>
      </div>
    </div>
  )

  if (linkable && product.type) {
    return (
      <Link to={`/product/${product.type}/${product.productId}`}>
        {content}
      </Link>
    )
  }

  return content
}

export default ProductPreviewCard
