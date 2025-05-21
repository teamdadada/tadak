import SearchBar from '@/components/common/SearchBar'
import ProductPreviewCard from '@/components/product/ProductPreviewCard'
import { useSearchProducts } from '@/hooks/useShop'
import { useEffect, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
      {/* 모바일 검색바 */}
      <div className="flex-1 min-[1200px]:hidden my-6">
        <SearchBar isMobile={true} initialQuery={query} />
      </div>

      {/* 검색 결과 */}
      <div className="min-h-[60vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-tadak-primary rounded-full mb-4"></div>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-red-100 text-red-600 p-4 rounded-full mb-4">
              <FiX size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              검색 중 오류가 발생했습니다
            </h3>
            <p className="text-gray-600 mb-4">잠시 후 다시 시도해주세요.</p>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
              다시 시도
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <FiSearch size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              <span className="font-medium text-tadak-warning">"{query}"</span>
              에 대한 검색 결과가 없습니다.
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              다른 키워드로 검색해 보세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {products.map((product) => (
              <ProductPreviewCard product={product} linkable={true} />
            ))}
          </div>
        )}
        {!hasNextPage && products.length > 0 && (
          <p className="text-center text-sm text-tadak-dark-gray p-10">
            모든 결과를 불러왔습니다
          </p>
        )}
      </div>
    </div>
  )
}

export default SearchPage
