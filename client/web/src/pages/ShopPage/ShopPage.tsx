import { useEffect, useState } from 'react'
import CategoryTabs from '@/components/shop/CategoryTabs'
import BearboneFilter from '@/components/shop/BearboneFilter'
import ItemGrid from '@/components/shop/ItemGrid'
import SwitchFilter from '@/components/shop/SwitchFilter'
import KeycapFilter from '@/components/shop/KeycapFilter'
import AsideRecommendation from '@/components/shop/AsideRecommendation'

const ShopPage = () => {
  const categories = ['베어본', '스위치', '키캡']
  const [tabWidth, setTabWidth] = useState('')

  useEffect(() => {
    const updateIndicator = () => {
      if (window.innerWidth >= 768) {
        // 데스크톱(웹) 뷰 이상일 땐 고정 120px
        setTabWidth('120px')
      } else {
        // 모바일뷰나 좁아지면 탭 개수에 따른 % 너비
        setTabWidth(`${100 / categories.length}%`)
      }
    }
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [categories.length])
   
  const panels = [
    <div key="bearbone" className="flex flex-col gap-6">
      <BearboneFilter />
      <div className="mt-6">
        <ItemGrid category="bearbone" />
      </div>
    </div>,
    <div key="switch" className="flex flex-col gap-6">
      <SwitchFilter />
      <div className="mt-6">
        <ItemGrid category="switch" />
      </div>
    </div>,
    <div key="keycap" className="flex flex-col gap-6">
      <KeycapFilter />
      <div className="mt-6">
        <ItemGrid category="keycap" />
      </div>
    </div>,
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
