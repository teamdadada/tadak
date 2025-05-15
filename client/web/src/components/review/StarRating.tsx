const StarRating = ({
  score,
  onChange,
}: {
  score: number
  onChange: (value: number) => void
}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          onMouseEnter={() => {}}
          className={`text-3xl transition-colors ${
            value <= score ? 'text-tadak-primary' : 'text-tadak-gray'
          } hover:text-tadak-primary`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
