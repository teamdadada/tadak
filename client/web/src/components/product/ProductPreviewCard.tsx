import { ProductDetailBase } from '@/types/product'

interface ProductPreviewCardProps {
  product: ProductDetailBase
}

const ProductPreviewCard = ({ product }: ProductPreviewCardProps) => {
  return (
    <div className="flex items-center gap-4 p-4 mb-6 border-b border-tadak-light-gray">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-16 h-16 rounded"
      />
      <div>
        <h1 className="text-lg font-semibold">{product.name}</h1>
        <p className="text-sm text-tadak-dark-gray">
          ₩ {product.minPrice.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default ProductPreviewCard
