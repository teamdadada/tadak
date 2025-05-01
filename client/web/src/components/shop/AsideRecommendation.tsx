const AsideRecommendation = () => {
  return (
    <aside className="hidden p-4 text-sm rounded-md lg:block bg-tadak-light-gray text-tadak-dark-gray">
      <h2 className="mb-2 font-semibold text-tadak-black">💡 추천</h2>
      <ul className="space-y-2">
        <li>추천을 넣을까</li>
        <li>최근 본 상품을 넣을까</li>
        <li>유사상품은 안되겠지</li>
      </ul>
    </aside>
  )
}

export default AsideRecommendation
