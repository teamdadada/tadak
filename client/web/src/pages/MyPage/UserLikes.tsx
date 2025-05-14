import ItemCard from '@/components/shop/ItemCard'
import Tabs from '@/components/ui/Tabs'

const tabLabels = ['전체', '베어본', '스위치', '키캡']

const UserLikes = () => {
  const exampleProduct = {
    productId: 1,
    name: '어쩌고저쩌고',
    minPrice: 30,
    thumbnail:
      'https://minio.tadak.kr/profile/profile_image_81d46d76-012a-4e30-8045-dca585dd9ada.jpg',
  }
  return (
    <div>
      <Tabs
        items={tabLabels}
        // selectedIndex={selectedIndex}
        // onChange={onChange}
        tabWidth={100}
        indicatorWidth={100}
        indicatorHeight={2}
        tabClassName="text-base"
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
        <ItemCard {...exampleProduct} />
      </div>
    </div>
  )
}

export default UserLikes
