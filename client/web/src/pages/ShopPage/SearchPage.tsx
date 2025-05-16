import SearchBar from '@/components/common/SearchBar'
import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import { useSearchProducts } from '@/hooks/useShop'
import { useEffect, useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSearchProducts(query)

  const products = data?.pages.flatMap((page) => page.list) ?? []
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <div className="flex-1 min-[1200px]:hidden mb-4">
        <SearchBar isMobile={true} initialQuery={query} />
      </div>

      <h1 className="mb-4 text-2xl font-semibold">🔍 ‘{query}’ 검색 결과</h1>

      {isLoading ? (
        <p>검색 중...</p>
      ) : isError ? (
        <p>검색 중 오류가 발생했습니다.</p>
      ) : products.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <ProductPreviewCard
              key={product.productId}
              product={product}
              linkable={true}
            />
          ))}

          <div ref={observerRef} className="h-10" />

          {isFetchingNextPage && (
            <p className="mt-2 text-sm text-center text-tadak-gray">
              불러오는 중...
            </p>
          )}

          {!hasNextPage && products.length > 0 && (
            <p className="flex gap-2 pl-4 text-sm text-tadak-gray">
              <FiSearch size={16} /> 더 이상 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPage
