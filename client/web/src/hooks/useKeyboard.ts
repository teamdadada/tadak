import { useQuery } from '@tanstack/react-query'
import { fetchKeyboardList, fetchKeyboardOptions, fetchBareboneProducts } from '@/services/keyboardService'

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

export const useBareboneProducts = (layoutId: number, materialId: number) => {
  return useQuery({
    queryKey: ['bareboneProducts', layoutId, materialId],
    queryFn: () => fetchBareboneProducts(layoutId, materialId),
    enabled: !!layoutId && !!materialId, // id 있을 때만 호출
  })
}