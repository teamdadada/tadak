import { useQuery } from '@tanstack/react-query'
import { fetchKeyboardList } from '@/services/keyboardService'

export const useKeyboardList = () => {
  return useQuery({
    queryKey: ['keyboardList'],
    queryFn: fetchKeyboardList,
  })
}