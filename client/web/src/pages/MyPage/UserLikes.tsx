import ItemCard from '@/components/shop/ItemCard'
import Tabs from '@/components/ui/Tabs'
import { useListZzim } from '@/hooks/useZzim'
import { ProductType } from '@/types/shop'
import { useState } from 'react'

const tabLabels = ['전체', '베어본', '스위치', '키캡']

const UserLikes = () => {
  const { data, isLoading } = useListZzim()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedTab = tabLabels[selectedIndex]

  const zzimProducts =
    data?.zzims.map((zzim) => ({
      productId: zzim.item.productId,
      name: zzim.item.name,
      minPrice: zzim.item.minPrice,
      thumbnail: zzim.item.thumbnail,
      type: zzim.item.type as ProductType,
      zzimId: zzim.zzimId,
    })) || []

  const filteredProducts =
    selectedTab === '전체'
      ? zzimProducts
      : zzimProducts.filter((product) => {
          if (selectedTab === '베어본') return product.type === 'BAREBONE'
          if (selectedTab === '스위치') return product.type === 'SWITCH'
          if (selectedTab === '키캡') return product.type === 'KEYCAP'
          return false // 명시적인 기본 반환값 추가
        })

  return (
    <div>
      <Tabs
        items={tabLabels}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        tabWidth={100}
        indicatorWidth={100}
        indicatorHeight={2}
        tabClassName="text-base"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">로딩 중</div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map((product) => (
            <ItemCard key={product.productId} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-500">
          아직 찜한 상품이 없습니다.
        </div>
      )}
    </div>
  )
}

export default UserLikes
