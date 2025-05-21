import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getPlacementList, getDefaultPlacement } from '@/services/placementService'
import type { Placement } from '@/types/placement'

export const usePlacementList = () => {
  return useQuery({
    queryKey: ['placementList'],
    queryFn: getPlacementList,
  })
}

export const useDefaultPlacement = (
  options?: Omit<UseQueryOptions<Placement>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['defaultPlacement'],
    queryFn: getDefaultPlacement,
    ...options,
  })
}