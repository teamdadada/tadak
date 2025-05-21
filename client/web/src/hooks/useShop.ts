import { getSearchedProducts } from '@/services/shopService'
import { ProductListResponse } from '@/types/shop'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useSearchProducts = (query: string) => {
  return useInfiniteQuery<ProductListResponse, Error>({
    queryKey: ['search', query],
    queryFn: async ({ pageParam = null }: QueryFunctionContext) => {
      const cursor = typeof pageParam === 'string' ? pageParam : null
      return getSearchedProducts({ query, cursor, size: 10 })
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.lastCursor : undefined,
    enabled: !!query, // query가 비어 있으면 실행 안 함
  })
}

export const useIsLgUp = () => {
  const [isLg, setIsLg] = useState(false)

  useEffect(() => {
    const check = () => setIsLg(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isLg
}
