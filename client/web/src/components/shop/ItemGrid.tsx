import { FilterByType, Product, ProductType } from '@/types/shop'
import ItemCard from './ItemCard'
import { useQuery } from '@tanstack/react-query'
import { getLatestProducts, getPopularProducts } from '@/services/shopService'

interface ItemGridProps {
  category: ProductType
  filters?: FilterByType<ProductType>
  sortOrder: 'latest' | 'popular'
}

const ItemGrid = ({ category, filters, sortOrder }: ItemGridProps) => {
  const fetchFunction =
    sortOrder === 'latest' ? getLatestProducts : getPopularProducts

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products', category, sortOrder, filters],
    queryFn: () => fetchFunction(category, 1, 10, filters ?? {}),
  })

  if (isLoading) return <p>로딩 중...</p>
  if (isError)
    return <p className="text-tadak-warning">오류가 발생했습니다. 😢</p>
  if (data.length === 0)
    return <p className="text-tadak-dark-gray">🔍 필터링된 결과가 없습니다.</p>

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
