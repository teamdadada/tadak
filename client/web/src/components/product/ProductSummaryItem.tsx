import defaultImage from '@/assets/images/logo.png'

interface ProductSummaryItemProps {
  name: string
  thumbnail?: string
}

const ProductSummaryItem = ({ name, thumbnail }: ProductSummaryItemProps) => {
  return (
    <div className="flex items-center gap-4 mx-4">
      <img
        src={thumbnail || defaultImage}
        alt={name}
        className="object-cover w-10 h-10 rounded"
      />
      <span className="text-sm font=medium truncate max-w-[160px]">{name}</span>
    </div>
  )
}

export default ProductSummaryItem
