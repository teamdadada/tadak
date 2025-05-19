import { useQuery } from '@tanstack/react-query'
import { getPlacementList } from '@/services/placementService'

export const usePlacementList = () => {
  return useQuery({
    queryKey: ['placementList'],
    queryFn: getPlacementList,
  })
}