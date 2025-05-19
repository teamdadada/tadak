import { useEffect, useState } from 'react'
import CategoryTabs from '@/components/shop/CategoryTabs'
import AsideTopProducts from '@/components/shop/AsideTopProducts'
import { FilterByType, ProductType } from '@/types/shop'
import FilterPanel from '@/components/shop/FilterPanel'
import PageIntroBanner from '@/components/common/PageIntroBanner'
import TopButton from '@/components/common/TopButton'
import Chatbot from '@/components/chatbot/Chatbot'
import { useIsLgUp } from '@/hooks/useShop'

const ShopPage = () => {
  const categories = ['베어본', '스위치', '키캡']
  const [tabWidth, setTabWidth] = useState('120px')
  const [sortOrder, setSortOrder] = useState<'LATEST' | 'POPULAR'>('LATEST')

  const [selectedBareboneFilters, setSelectedBareboneFilters] = useState<
    FilterByType<'BAREBONE'>
  >({})

  const [selectedSwitchFilters, setSelectedSwitchFilters] = useState<
    FilterByType<'SWITCH'>
  >({})

  const [selectedKeycapFilters, setSelectedKeycapFilters] = useState<
    FilterByType<'KEYCAP'>
  >({})

  const isLg = useIsLgUp()

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
    <div className="flex flex-col w-full max-w-6xl p-4 mx-auto">
      <PageIntroBanner
        title="🛒 쇼핑"
        description="다양한 제품을 살펴보고, 타닥 유저들의 리뷰로 어떤지 알아보세요!"
      />
      <div className="flex flex-col justify-center gap-6 lg:flex-row">
        <div className="lg:w-[calc(100%-180px)]">
          <CategoryTabs
            items={categories}
            panels={panels}
            width="100%"
            tabWidth={tabWidth}
            indicatorHeight={3}
            className="w-full"
          />
        </div>
        {isLg && (
          <div className="flex-1">
            <AsideTopProducts />
          </div>
        )}
      </div>
      <Chatbot />
      <TopButton showBelow={400} />
    </div>
  )
}

export default ShopPage
