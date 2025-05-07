import { FilterByType, ProductType } from '@/types/shop'
import BearboneFilter from './BareboneFilter'
import SwitchFilter from './SwitchFilter'
import KeycapFilter from './KeycapFilter'
import SortButtons from './SortButtons'
import ItemGrid from './ItemGrid'

interface FilterPanelProps {
  category: ProductType
  sortOrder: 'latest' | 'popular'
  filters: FilterByType<ProductType>
  onFilterChange: (filters: FilterByType<ProductType>) => void
  onSortChange: (order: 'latest' | 'popular') => void
}

const FilterPanel = ({
  category,
  sortOrder,
  filters,
  onFilterChange,
  onSortChange,
}: FilterPanelProps) => {
  const renderFilter = () => {
    switch (category) {
      case ProductType.BAREBONE:
        return <BearboneFilter selected={filters} onChange={onFilterChange} />
      case ProductType.SWITCH:
        return <SwitchFilter selected={filters} onChange={onFilterChange} />
      case ProductType.KEYCAP:
        return <KeycapFilter selected={filters} onChange={onFilterChange} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {renderFilter()}
      <SortButtons sortOrder={sortOrder} onChange={onSortChange} />
      <ItemGrid category={category} filters={filters} sortOrder={sortOrder} />
    </div>
  )
}

export default FilterPanel
