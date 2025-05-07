import { useEffect, useState } from 'react'
import CategoryTabs from '@/components/shop/CategoryTabs'
// import BearboneFilter from '@/components/shop/BareboneFilter'
// import ItemGrid from '@/components/shop/ItemGrid'
// import SwitchFilter from '@/components/shop/SwitchFilter'
// import KeycapFilter from '@/components/shop/KeycapFilter'
import AsideRecommendation from '@/components/shop/AsideRecommendation'
import { FilterByType, ProductType } from '@/types/shop'
import FilterPanel from '@/components/shop/FilterPanel'

const ShopPage = () => {
  const categories = ['베어본', '스위치', '키캡']
  const [tabWidth, setTabWidth] = useState('120px')
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest')

  const [selectedBareboneFilters, setSelectedBareboneFilters] = useState<
    FilterByType<'BAREBONE'>
  >({
    // manufacturer: [] as string[],
    // keyLayout: [] as string[],
    // features: [] as string[],
    // minPriceMin: undefined as number | undefined,
    // minPriceMax: undefined as number | undefined,
  })

  const [selectedSwitchFilters, setSelectedSwitchFilters] = useState<
    FilterByType<'SWITCH'>
  >({
    // switchType: [] as string[],
    // keyForce: [] as string[],
    // quantity: [] as string[],
    // minPriceMin: undefined as number | undefined,
    // minPriceMax: undefined as number | undefined,
  })

  const [selectedKeycapFilters, setSelectedKeycapFilters] = useState<
    FilterByType<'KEYCAP'>
  >({
    // keycapMaterial: [] as string[],
    // engravingPosition: [] as string[],
    // keyCount: [] as string[],
    // minPriceMin: undefined as number | undefined,
    // minPriceMax: undefined as number | undefined,
  })

  useEffect(() => {
    const updateIndicator = () => {
      setTabWidth((prev) => {
        const newWidth = window.innerWidth >= 768 ? '120px' : '33.33%'
        return prev === newWidth ? prev : newWidth
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [])

  // const handleBareboneFilterChange = useCallback(
  //   (next: FilterByType<'BAREBONE'>) => {
  //     setSelectedBareboneFilters((prev) => {
  //       // 🚀 JSON.stringify로 깊은 비교하여 무한 렌더링 방지
  //       if (JSON.stringify(prev) === JSON.stringify(next)) {
  //         return prev // ✅ 동일하면 상태 변경 안함
  //       }
  //       return next
  //     })
  //   },
  //   [],
  // )

  // const handleSwitchFilterChange = useCallback(
  //   (next: FilterByType<'SWITCH'>) => {
  //     setSelectedSwitchFilters((prev) => {
  //       if (JSON.stringify(prev) === JSON.stringify(next)) {
  //         return prev
  //       }
  //       return next
  //     })
  //   },
  //   [],
  // )

  // const handleKeycapFilterChange = useCallback(
  //   (next: FilterByType<'KEYCAP'>) => {
  //     setSelectedKeycapFilters((prev) => {
  //       if (JSON.stringify(prev) === JSON.stringify(next)) {
  //         return prev
  //       }
  //       return next
  //     })
  //   },
  //   [],
  // )

  const panels = [
    <FilterPanel
      key="BAREBONE"
      category={ProductType.BAREBONE}
      sortOrder={sortOrder}
      filters={selectedBareboneFilters}
      onFilterChange={setSelectedBareboneFilters}
      onSortChange={setSortOrder}
    />,
    <FilterPanel
      key="SWITCH"
      category={ProductType.SWITCH}
      sortOrder={sortOrder}
      filters={selectedSwitchFilters}
      onFilterChange={setSelectedSwitchFilters}
      onSortChange={setSortOrder}
    />,
    <FilterPanel
      key="KEYCAP"
      category={ProductType.KEYCAP}
      sortOrder={sortOrder}
      filters={selectedKeycapFilters}
      onFilterChange={setSelectedKeycapFilters}
      onSortChange={setSortOrder}
    />,
  ]

  return (
    <div className="w-full p-4 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold">🛒 쇼핑 페이지</h1>
      <p>제품을 둘러보고 구매할 수 있습니다.</p>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-[calc(100%-300px)]">
          <CategoryTabs
            items={categories}
            panels={panels}
            width="100%"
            tabWidth={tabWidth}
            indicatorHeight={3}
            className="w-full mb-6"
          />
        </div>
        <div className="flex-1">
          <AsideRecommendation />
        </div>
      </div>
    </div>
  )
}

export default ShopPage
