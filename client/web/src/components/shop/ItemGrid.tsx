import { FilterByType, ProductListResponse, ProductType } from '@/types/shop'
import ItemCard from './ItemCard'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/shopService'
import { useCallback, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ItemGridProps {
  category: ProductType
  filters?: FilterByType<ProductType>
  sortOrder: 'LATEST' | 'POPULAR'
}

// 초기 로딩용 스켈레톤 컴포넌트
const SkeletonCard = () => (
  <div className="flex flex-col rounded-md animate-pulse">
    <div className="w-full h-44 bg-tadak-light-gray rounded-t-md"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-tadak-light-gray rounded-sm w-2/3"></div>
      <div className="h-4 bg-tadak-light-gray rounded-sm w-1/2"></div>
      <div className="h-5 bg-tadak-light-gray rounded-sm w-3/4 mt-3"></div>
    </div>
  </div>
)

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

  // 초기 로딩 시 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  // 에러 발생 시 UI
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-tadak-light-gray/20 rounded-md">
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
          className="text-tadak-warning mb-4"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <p className="text-lg font-medium text-tadak-warning mb-2">
          오류가 발생했습니다
        </p>
        <p className="text-sm text-gray-600">잠시 후 다시 시도해 주세요</p>
      </div>
    )
  }

  // 데이터가 없는 경우
  if (!data?.pages || data.pages[0]?.list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-tadak-light-gray/20 rounded-md">
        <p className="text-lg font-medium mb-2">상품이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {data?.pages?.flatMap((page) =>
        page.list?.map((item) => <ItemCard key={item.productId} {...item} />),
      ) || []}

      {/* 추가 로딩 UI */}
      <div
        ref={observerRef}
        className="col-span-full flex items-center justify-center py-6"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-tadak-secondary animate-spin mb-2" />
          </div>
        ) : hasNextPage ? (
          <p className="text-sm text-gray-400">
            아래로 스크롤하면 더 많은 상품을 볼 수 있어요
          </p>
        ) : (
          data &&
          data.pages &&
          data.pages[0]?.list.length > 0 && (
            <p className="text-sm text-gray-500 py-2">
              헉! 여기까지가 끝이에요.
            </p>
          )
        )}
      </div>
    </div>
  )
}

export default ItemGrid
