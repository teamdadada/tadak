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
  const { data } = useQuery({
    queryKey: ['filters', 'bearbone'],
    queryFn: getBearboneFilters,
  })

  return (
    <div className="border ">
      {data?.manufacturer && (
        <CheckboxGroup
          title="제조사별"
          options={data.manufacturer}
          selected={selected.manufacturer ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              manufacturer: Array.isArray(next) ? next : [next],
            })
          }
        />
      )}
      {data?.keyLayout && (
        <CheckboxGroup
          title="키 배열"
          options={data.keyLayout}
          selected={selected.keyLayout ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              keyLayout: Array.isArray(next) ? next : [next],
            })
          }
        />
      )}
      {data?.features && (
        <CheckboxGroup
          title="추가사항"
          options={data.features}
          selected={selected.features ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              features: Array.isArray(next) ? next : [next],
            })
          }
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
