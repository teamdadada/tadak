import { FilterByType, ProductListResponse, ProductType } from '@/types/shop'
import ItemCard from './ItemCard'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/shopService'
import { useCallback, useEffect, useRef } from 'react'

interface ItemGridProps {
  category: ProductType
  filters?: FilterByType<ProductType>
  sortOrder: 'LATEST' | 'POPULAR'
}

const ItemGrid = ({ category, filters, sortOrder }: ItemGridProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ProductListResponse, Error>({
    queryKey: ['products', category, sortOrder, filters],
    queryFn: async ({ pageParam = null }: QueryFunctionContext) => {
      const cursor = typeof pageParam === 'string' ? pageParam : null
      return getProducts({
        type: category,
        cursor,
        size: 10,
        sort: sortOrder,
        ...filters,
      })
    },

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.lastCursor : undefined,
  })

  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage) fetchNextPage()
    },
    [fetchNextPage, hasNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 더 빠르게 로딩될 수 있도록 50%로 조정
    })

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [handleObserver])

  if (isLoading) return <p>🔄 로딩 중...</p>
  if (isError)
    return (
      <div className="flex flex-col items-center text-tadak-warning">
        <p>오류가 발생했습니다. 😢</p>
      </div>
    )

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {data?.pages.flatMap((page) =>
        page.list.map((item) => <ItemCard key={item.productId} {...item} />),
      )}

      <div
        ref={observerRef}
        className="flex items-center justify-center w-full h-10"
      >
        {isFetchingNextPage && <p>🔄 추가 로딩 중...</p>}
      </div>
    </div>
  )
}

export default ItemGrid
