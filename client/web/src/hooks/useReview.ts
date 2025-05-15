import { getReviewList, getReviewScore } from '@/services/reviewService'
import { ReviewListResponse, ReviewScoreResponse } from '@/types/review'
import { useQuery } from '@tanstack/react-query'

export const useReviewList = (
  productId: number | string,
  sort: 'latest' | 'score' = 'latest',
) => {
  return useQuery<ReviewListResponse>({
    queryKey: ['reviewList', productId, sort],
    queryFn: () => getReviewList(productId, sort),
    enabled: !!productId,
  })
}

export const useReviewScore = (productId: number | string) => {
  return useQuery<ReviewScoreResponse>({
    queryKey: ['reviewScore', productId],
    queryFn: () => getReviewScore(productId),
    enabled: !!productId,
  })
}
