const PriceFilter = () => (
  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
    <h3 className="mb-1 font-medium min-w-[80px] md:mb-0">가격대</h3>
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="최소"
        className="w-20 px-2 py-1 border rounded"
      />
      <span>~</span>
      <input
        type="number"
        placeholder="최대"
        className="w-20 px-2 py-1 border rounded"
      />
    </div>
  </div>
)

export default PriceFilter
