import { Product } from './shop'

export interface ReviewAuthor {
  id: number
  name: string
  profileImg: string
}

export interface Review {
  reviewId: number
  product: Product
  content: string
  score: number // 1, 2, 3, 4, 5
  images: string[]
  author: ReviewAuthor
}

export interface ReviewListResponse {
  count: number
  reviews: Review[]
}

export interface ReviewScoreResponse {
  isExist: boolean
  productId: number
  totalScore: number
  scoreCounts: {
    [score: number]: number
  }
}

export interface ReviewPayload {
  reviewScore: number
  reviewContent: string
  imageList: string[]
}
