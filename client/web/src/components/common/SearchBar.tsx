import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className={`w-full px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-tadak-primary ${
          isMobile ? 'h-10' : 'h-9 max-w-[32rem] min-w-[12rem]'
        }`}
      />
    </form>
  )
}

export default SearchBar
