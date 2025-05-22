import {
  ReviewListResponse,
  ReviewPayload,
  ReviewScoreResponse,
} from '@/types/review'
import { REVIEW_END_POINT } from './endPoints'
import http from './http-common'

export const getReviewList = async (
  productId: number | string,
  sort: 'latest' | 'score' = 'latest',
): Promise<ReviewListResponse> => {
  const { data } = await http.get<ReviewListResponse>(
    REVIEW_END_POINT.LIST(productId),
    {
      params: { sort },
    },
  )
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
  return http.delete(REVIEW_END_POINT.DELETE(reviewId))
}

export const postReview = async (productId: number, payload: ReviewPayload) => {
  return http.post(REVIEW_END_POINT.CREATE(productId), payload)
}

export const getMyReviews = async (): Promise<ReviewListResponse> => {
  const { data } = await http.get<ReviewListResponse>(REVIEW_END_POINT.MY_LIST)
  return data
}
