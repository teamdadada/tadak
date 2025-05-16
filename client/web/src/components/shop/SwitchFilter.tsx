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

  if (isLoading) return
  if (isError || !data) return

  return (
    <div className="border">
      {/* {data.switchType && (
        <CheckboxGroup
          title="스위치 방식"
          options={data.switchType}
          selected={selected.switchType ?? []}
          onChange={(next) => onChange({ ...selected, switchType: Array.isArray(next) ? next : [next], })}
        />
      )} */}
      {data.keyForce && (
        <CheckboxGroup
          title="키압"
          options={data.keyForce}
          selected={selected.keyForce ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              keyForce: Array.isArray(next) ? next : [next],
            })
          }
        />
      )}
      {data.quantity && (
        <CheckboxGroup
          title="개수"
          options={data.quantity}
          selected={selected.quantity ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              quantity: Array.isArray(next) ? next : [next],
            })
          }
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
