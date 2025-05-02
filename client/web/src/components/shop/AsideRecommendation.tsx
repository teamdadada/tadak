import ItemCard from "./ItemCard"

const recommendedItems = [
  {
    id: 1,
    name: "타닥 베어본 키보드",
    price: 129000,
    imageUrl: "https://cataas.com/cat?1",
  },
  {
    id: 2,
    name: "스무스 리니어 스위치",
    price: 39000,
    imageUrl: "https://cataas.com/cat?2",
  },
  {
    id: 3,
    name: "클래식 키캡 세트",
    price: 49000,
    imageUrl: "https://cataas.com/cat?3",
  },
]

const AsideRecommendation = () => {
  return (
    <aside className="hidden p-4 text-sm rounded-md w-[180px] lg:block bg-tadak-light-gray text-tadak-dark-gray">
      <h2 className="mb-2 font-semibold text-tadak-black">💡 추천</h2>
      <ul className="space-y-2">
        {recommendedItems.map((item) => (
          <li key={item.id} className="flex justify-center">
            <ItemCard
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              size="sm" // 작은 사이즈로 제한
              liked={false} // 기본 비활성화
              to={`/products/${item.id}`}
            />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AsideRecommendation
