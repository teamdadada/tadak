import { getKeycapFilters } from '@/services/shopService'
import CheckboxGroup from './CheckboxGroup'
import PriceFilter from './PriceFilter'
import { useQuery } from '@tanstack/react-query'
import { FilterByType } from '@/types/shop'

interface KeycapFilterProps {
  selected: FilterByType<'KEYCAP'>
  onChange: (next: FilterByType<'KEYCAP'>) => void
}

const KeycapFilter = ({ selected, onChange }: KeycapFilterProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['filters', 'keycap'],
    queryFn: getKeycapFilters,
  })

  if (isLoading) return
  if (isError || !data) return

  return (
    <div className="border">
      {data.keycapMaterial && (
        <CheckboxGroup
          title="재질"
          options={data.keycapMaterial}
          selected={selected.keycapMaterial ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              keycapMaterial: Array.isArray(next) ? next : [next],
            })
          }
        />
      )}
      {/* {data.engravingPosition && (
        <CheckboxGroup
          title="각인 위치"
          options={data.engravingPosition}
          selected={selected.engravingPosition ?? []}
          onChange={(next) => onChange({ ...selected, engravingPosition: Array.isArray(next) ? next : [next], })}
        />
      )} */}
      {data.keyCount && (
        <CheckboxGroup
          title="키 수"
          options={data.keyCount}
          selected={selected.keyCount ?? []}
          onChange={(next) =>
            onChange({
              ...selected,
              keyCount: Array.isArray(next) ? next : [next],
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

export default KeycapFilter
