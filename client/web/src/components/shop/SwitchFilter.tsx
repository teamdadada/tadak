import { getSwitchFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'
import { FilterByType } from '@/types/shop'

interface SwitchFilterProps {
  selected: FilterByType<'SWITCH'>
  onChange: (next: FilterByType<'SWITCH'>) => void
}

const SwitchFilter = ({ selected, onChange }: SwitchFilterProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filters', 'switch'],
    queryFn: getSwitchFilters,
  })

  if (isLoading)
    return <p className="text-sm text-tadak-dark-gray">로딩 중...</p>
  if (isError || !data)
    return (
      <p className="text-sm text-tadak-warning">필터를 불러오지 못했습니다.</p>
    )

  return (
    <div className="px-2 space-y-4">
      {data.switchType && (
        <CheckboxGroup
          title="스위치 방식"
          options={data.switchType}
          selected={selected.switchType ?? []}
          onChange={(val) => onChange({ ...selected, switchType: val })}
        />
      )}
      {data.keyForce && (
        <CheckboxGroup
          title="키압"
          options={data.keyForce}
          selected={selected.keyForce ?? []}
          onChange={(val) => onChange({ ...selected, keyForce: val })}
        />
      )}
      {data.quantity && (
        <CheckboxGroup
          title="개수"
          options={data.quantity}
          selected={selected.quantity ?? []}
          onChange={(val) => onChange({ ...selected, quantity: val })}
        />
      )}
      <PriceFilter
        min={selected.minPriceMin}
        max={selected.minPriceMax}
        onChange={(min, max) =>
          onChange({ ...selected, minPriceMin: min, minPriceMax: max })
        }
      />
    </div>
  )
}

export default SwitchFilter
