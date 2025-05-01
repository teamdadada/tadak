import { getBearboneFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'

const BearboneFilter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filters', 'bearbone'],
    queryFn: getBearboneFilters,
  })

  if (isLoading)
    return <p className="text-sm text-tadak-dark-gray">로딩 중...</p>
  if (isError || !data)
    return (
      <p className="text-sm text-tadak-warning">필터를 불러오지 못했습니다.</p>
    )

  return (
    <div className="space-y-4">
      {data.manufacturers && (
        <CheckboxGroup title="제조사별" options={data.manufacturers} />
      )}
      {data.layout && <CheckboxGroup title="키 배열" options={data.layout} />}
      {data.features && (
        <CheckboxGroup title="추가사항" options={data.features} />
      )}
      <PriceFilter />
    </div>
  )
}

export default BearboneFilter
