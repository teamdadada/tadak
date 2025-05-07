import { FilterByType, Product, ProductType } from '@/types/shop'
import ItemCard from './ItemCard'
import { useQuery } from '@tanstack/react-query'
import { getLatestProducts } from '@/services/shopService'

interface ItemGridProps {
  category: ProductType
  filters?: FilterByType<ProductType>
}

const ItemGrid = ({ category, filters }: ItemGridProps) => {
  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', category, filters],
    queryFn: () =>
      getLatestProducts(
        category as ProductType,
        1,
        10,
        filters ?? ({} as FilterByType<ProductType>),
      ),
  })

  if (isLoading) return <p>로딩 중...</p>

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {data.map((item) => (
        <ItemCard
          key={item.productId}
          id={item.productId} // ✅ productId -> id로 매핑
          name={item.name}
          price={item.minPrice} // ✅ minPrice -> price로 매핑
          imageUrl={item.thumbnail} // ✅ thumbnail -> imageUrl로 매핑
          liked={item.liked ?? false} // 좋아요 기본값 false
        />
      ))}
    </div>
  )
}

export default ItemGrid
