interface SortButtonsProps {
  sortOrder: 'latest' | 'popular'
  onChange: (order: 'latest' | 'popular') => void
}

const SortButtons = ({ sortOrder, onChange }: SortButtonsProps) => {
  return (
    <div className="flex justify-start mb-2">
      <button
        className={`${sortOrder === 'latest' ? 'font-bold' : 'text-tadak-gray'}`}
        onClick={() => onChange('latest')}
      >
        최신순
      </button>
      <span className="mx-2 text-tadak-gray">|</span>
      <button
        className={`${sortOrder === 'popular' ? 'font-bold' : 'text-tadak-gray'}`}
        onClick={() => onChange('popular')}
      >
        인기순
      </button>
    </div>
  )
}

export default SortButtons
