import { getSwitchFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'

const SwitchFilter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filters', 'switch'],
    queryFn: getSwitchFilters,
  })

  if (isLoading) return <p className="text-sm text-gray-500">로딩 중...</p>
  if (isError || !data)
    return <p className="text-sm text-red-500">필터를 불러오지 못했습니다.</p>

  return (
    <div className="space-y-4">
      {data.types && <CheckboxGroup title="스위치 방식" options={data.types} />}
      {data.pressure && <CheckboxGroup title="키압" options={data.pressure} />}
      {data.count && <CheckboxGroup title="개수" options={data.count} />}
      <PriceFilter />
    </div>
  )
}

export default SwitchFilter
