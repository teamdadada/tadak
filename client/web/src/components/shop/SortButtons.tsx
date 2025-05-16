interface SortButtonsProps {
  sortOrder: 'LATEST' | 'POPULAR'
  onChange: (order: 'LATEST' | 'POPULAR') => void
}

const SortButtons = ({ sortOrder, onChange }: SortButtonsProps) => {
  return (
    <div className="flex justify-end mb-2 text-sm" >
      <button
        className={`${sortOrder === 'LATEST' ? 'font-bold' : 'text-tadak-gray'}`}
        onClick={() => onChange('LATEST')}
      >
        최신순
      </button>
      <span className="mx-2 text-tadak-gray">|</span>
      <button
        className={`${sortOrder === 'POPULAR' ? 'font-bold' : 'text-tadak-gray'}`}
        onClick={() => onChange('POPULAR')}
      >
        인기순
      </button>
    </div>
  )
}

export default SortButtons
