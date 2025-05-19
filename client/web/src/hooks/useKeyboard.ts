import { useQuery } from '@tanstack/react-query'
import { fetchKeyboardList, fetchKeyboardOptions } from '@/services/keyboardService'

export const useKeyboardList = () => {
  return useQuery({
    queryKey: ['keyboardList'],
    queryFn: fetchKeyboardList,
  })
}

export const useKeyboardOptions = () => {
  return useQuery({
    queryKey: ['keyboardOptions'],
    queryFn: fetchKeyboardOptions,
  })
}