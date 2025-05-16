import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

interface SearchBarProps {
  isMobile?: boolean
  initialQuery?: string
}

const SearchBar = ({ isMobile = false, initialQuery = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery) // query 바뀔 때 반영되게 (뒤로가기 등 대비)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className={`flex-1 w-full px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-tadak-primary ${
          isMobile ? 'h-10' : 'h-9 max-w-[32rem] min-w-[12rem]'
        }`}
      />
      <Button
        type="button"
        onClick={handleSubmit}
        className={`flex items-center justify-center text-white rounded-md bg-tadak-primary hover:bg-tadak-primary ${
          isMobile ? 'w-10 h-10' : 'w-10 h-9'
        }`}
      >
        <FiSearch size={18} />
      </Button>
    </form>
  )
}

export default SearchBar
