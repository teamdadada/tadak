import {
  getBearboneProducts,
  getKeycapProducts,
  getSwitchProducts,
} from '@/services/shopService'
import ItemCard from './ItemCard'
import { useQuery } from '@tanstack/react-query'

const ItemGrid = ({ category }: { category: string }) => {
  const queryFnMap = {
    bearbone: getBearboneProducts,
    switch: getSwitchProducts,
    keycap: getKeycapProducts,
  }

  const { data = [], isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => queryFnMap[category]({}),
  })

  if (isLoading) return <p>로딩 중...</p>

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {data.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </div>
  )
}

export default ItemGrid
