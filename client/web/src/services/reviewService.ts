import { ReviewListResponse, ReviewScoreResponse } from '@/types/review'
import { REVIEW_END_POINT } from './endPoints'
import http from './http-common'

export const getReviewList = async (
  productId: number | string,
  sort: 'latest' | 'score' = 'latest',
): Promise<ReviewListResponse> => {
  const url = `${REVIEW_END_POINT.LIST(productId)}?sort=${sort}`

  const { data } = await http.get<ReviewListResponse>(url)
  return data
}

export const getReviewScore = async (
  productId: number | string,
): Promise<ReviewScoreResponse> => {
  const { data } = await http.get<ReviewScoreResponse>(
    REVIEW_END_POINT.SCORE(productId),
  )
  return data
}

export const deleteReview = async (reviewId: number) => {
  return http.delete(`review/${reviewId}`)
}
