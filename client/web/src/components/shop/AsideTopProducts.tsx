import ItemCard from './ItemCard'

const recommendedItems = [
  {
    productId: 1,
    name: '타닥 베어본 키보드',
    minPrice: 129000,
    thumbnail: 'https://cataas.com/cat?1',
  },
  {
    productId: 2,
    name: '스무스 리니어 스위치',
    minPrice: 39000,
    thumbnail: 'https://cataas.com/cat?2',
  },
  {
    productId: 3,
    name: '클래식 키캡 세트',
    minPrice: 49000,
    thumbnail: 'https://cataas.com/cat?3',
  },
]

const AsideRecommendation = () => {
  return (
    <aside className="hidden p-4 text-sm rounded-md w-[180px] lg:block bg-tadak-light-gray text-tadak-dark-gray">
      <h2 className="mb-2 font-semibold text-tadak-black">💡 인기상품품</h2>
      <ul className="space-y-2">
        {recommendedItems.map((item) => (
          <li key={item.productId} className="flex justify-center">
            <ItemCard {...item} size="sm" />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AsideRecommendation
