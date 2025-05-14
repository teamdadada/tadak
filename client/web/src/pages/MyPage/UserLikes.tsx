import ItemCard from '@/components/shop/ItemCard'
import Tabs from '@/components/ui/Tabs'
import { Product, ProductType } from '@/types/shop'
import { useState } from 'react'

const tabLabels = ['전체', '베어본', '스위치', '키캡']
const exampleProductList: Product[] = [
  {
    productId: 1,
    name: '베어본 키보드 1',
    minPrice: 30000,
    thumbnail:
      'https://minio.tadak.kr/profile/profile_image_81d46d76-012a-4e30-8045-dca585dd9ada.jpg',
    type: 'BAREBONE' as ProductType,
  },
  {
    productId: 2,
    name: '스위치 A',
    minPrice: 12000,
    thumbnail:
      'https://minio.tadak.kr/profile/profile_image_81d46d76-012a-4e30-8045-dca585dd9ada.jpg',
    type: 'SWITCH' as ProductType,
  },
  {
    productId: 3,
    name: '키캡 세트',
    minPrice: 20000,
    thumbnail:
      'https://minio.tadak.kr/profile/profile_image_81d46d76-012a-4e30-8045-dca585dd9ada.jpg',
    type: 'KEYCAP' as ProductType,
  },
]

const UserLikes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedTab = tabLabels[selectedIndex]

  const filteredProducts =
    selectedTab === '전체'
      ? exampleProductList
      : exampleProductList.filter((p) => {
          if (selectedTab === '베어본') return p.type === 'BAREBONE'
          if (selectedTab === '스위치') return p.type === 'SWITCH'
          if (selectedTab === '키캡') return p.type === 'KEYCAP'
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
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <ItemCard key={product.productId} {...product} />
        ))}
      </div>
    </div>
  )
}

export default UserLikes
