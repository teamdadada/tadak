import ItemCard from './ItemCard'
import { getTopProducts } from '@/services/shopService'
import { useQuery } from '@tanstack/react-query'

const AsideRecommendation = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['topProducts'],
    queryFn: () => getTopProducts({ size: 5 }),
  })

  if (isLoading) return null

  return (
    <aside className="hidden p-4 text-sm rounded-md w-[180px] lg:block bg-tadak-light-gray text-tadak-dark-gray">
      <h2 className="mb-2 font-semibold text-tadak-black">💡 인기상품</h2>
      {isLoading && (
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li
              key={idx}
              className="w-full h-[80px] bg-tadak-gray animate-pulse rounded-md"
            />
          ))}
        </ul>
      )}

      {isError && (
        <p className="text-sm font-medium text-tadak-warning">⚠ 에러 발생</p>
      )}

      {!isLoading && !isError && (
        <ul className="space-y-2">
          {data?.list.map((item) => (
            <li key={item.productId} className="flex justify-center">
              <ItemCard {...item} size="sm" />
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default AsideRecommendation
