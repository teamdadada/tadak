import { useQuery } from '@tanstack/react-query'
import { fetchBackgroundList } from '@/services/backgroundService'

export const useBackgroundList = () => {
  return useQuery({
    queryKey: ['backgroundList'],
    queryFn: fetchBackgroundList,
  })
}