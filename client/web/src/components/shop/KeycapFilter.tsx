import { getKeycapFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'

const KeycapFilter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filters', 'keycap'],
    queryFn: getKeycapFilters,
  })

  if (isLoading)
    return <p className="text-sm text-tadak-dark-gray">로딩 중...</p>
  if (isError || !data)
    return (
      <p className="text-sm text-tadak-warning">필터를 불러오지 못했습니다.</p>
    )

  return (
    <div className="space-y-4">
      {data.material && (
        <CheckboxGroup title="키캡 재질" options={data.material} />
      )}
      {data.legends && (
        <CheckboxGroup title="각인 위치" options={data.legends} />
      )}
      {data.count && <CheckboxGroup title="개수" options={data.count} />}
      <PriceFilter />
    </div>
  )
}

export default KeycapFilter
