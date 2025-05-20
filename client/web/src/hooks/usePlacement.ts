import { useQuery } from '@tanstack/react-query'
import { getPlacementList, getDefaultPlacement } from '@/services/placementService'

export const usePlacementList = () => {
  return useQuery({
    queryKey: ['placementList'],
    queryFn: getPlacementList,
  })
}

export const useDefaultPlacement = () => {
  return useQuery({
    queryKey: ['defaultPlacement'],
    queryFn: getDefaultPlacement,
  })
}