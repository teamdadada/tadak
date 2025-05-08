import { getBearboneFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'
import { FilterByType } from '@/types/shop'

interface BearboneFilterProps {
  selected: FilterByType<'BAREBONE'>
  onChange: (next: FilterByType<'BAREBONE'>) => void
}

const BearboneFilter = ({ selected, onChange }: BearboneFilterProps) => {
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
    <div className="px-2 space-y-4">
      {data?.manufacturer && (
        <CheckboxGroup
          title="제조사별"
          options={data.manufacturer}
          selected={selected.manufacturer ?? []}
          onChange={(next) => onChange({ ...selected, manufacturer: next })}
        />
      )}
      {data?.keyLayout && (
        <CheckboxGroup
          title="키 배열"
          options={data.keyLayout}
          selected={selected.keyLayout ?? []}
          onChange={(next) => onChange({ ...selected, keyLayout: next })}
        />
      )}
      {data?.features && (
        <CheckboxGroup
          title="추가사항"
          options={data.features}
          selected={selected.features ?? []}
          onChange={(next) => onChange({ ...selected, features: next })}
        />
      )}
      <PriceFilter
        min={selected.minPriceMin}
        max={selected.minPriceMax}
        onChange={(min, max) =>
          onChange({
            ...selected,
            minPriceMin: min ?? selected.minPriceMin,
            minPriceMax: max ?? selected.minPriceMax,
          })
        }
      />
    </div>
  )
}

export default BearboneFilter
