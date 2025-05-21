import defaultImage from '@/assets/images/no_image.png'

interface ProductSummaryItemProps {
  name: string
  thumbnail?: string
}

const ProductSummaryItem = ({ name, thumbnail }: ProductSummaryItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={thumbnail || defaultImage}
        alt={name || 'image'}
        className="object-cover w-10 h-10 rounded"
      />
      <span className="text-sm font=medium truncate">
        {name || '삭제된 상품'}
      </span>
    </div>
  )
}

export default ProductSummaryItem
