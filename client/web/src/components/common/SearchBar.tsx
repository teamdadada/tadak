import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'

interface SearchBarProps {
  isMobile?: boolean
  initialQuery?: string
  onSearch?: () => void // 검색 후 호출될 콜백 함수 추가
}

const SearchBar = ({
  isMobile = false,
  initialQuery = '',
  onSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery) // query 바뀔 때 반영되게 (뒤로가기 등 대비)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?query=${encodeURIComponent(query.trim())}`)
    if (onSearch && isMobile) {
      onSearch() // 모바일에서 검색 후 메뉴 닫기 위한 콜백 함수 호출
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className={`flex-1 w-full px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-tadak-primary shadow-none ${
          isMobile ? 'h-10' : 'h-9 max-w-[32rem] min-w-[12rem]'
        }`}
      />
      <button
        type="submit"
        className={`flex items-center justify-center text-white rounded-md bg-tadak-primary hover:bg-tadak-primary ${
          isMobile ? 'w-10 h-10' : 'w-10 h-9'
        }`}
      >
        <FiSearch size={18} />
      </button>
    </form>
  )
}

export default SearchBar
