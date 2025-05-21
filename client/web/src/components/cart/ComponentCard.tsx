import { SelectedProduct } from '@/types/keyboard'
import noImage from '@/assets/images/no_image.png'

interface ComponentCardProps {
  label: string
  product: SelectedProduct
  description: string
  customKeyMap?: Record<string, string>
}

const ComponentCard = ({
  label,
  product,
  description,
  customKeyMap,
}: ComponentCardProps) => {
  const pointCount = customKeyMap ? Object.keys(customKeyMap).length : 0
  const extraPrice = pointCount * 500
  const finalPrice = product.price + extraPrice

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-tadak-white">
      <img
        src={product.imageUrl || noImage}
        alt={product.name}
        className="object-cover w-24 h-24 rounded bg-tadak-gray"
      />
      <div className="flex-1">
        <p className="text-base font-semibold">{label}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        {customKeyMap && Object.keys(customKeyMap).length > 0 && (
          <p className="text-sm text-gray-500 mt-1 truncate max-w-[340px]">
            {Object.entries(customKeyMap)
              .map(([key, color]) => `${key}: ${color.toUpperCase()}`)
              .join(' / ')}
          </p>
        )}
      </div>
      <p className="mt-1 text-base font-semibold whitespace-nowrap">
        {finalPrice.toLocaleString()}원
      </p>
    </div>
  )
}

export default ComponentCard
