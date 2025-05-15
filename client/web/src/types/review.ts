export interface ReviewAuthor {
  id: number
  name: string
  profileImg: string
}

export interface Review {
  reviewId: number
  productId: number
  content: string
  score: number // 1, 2, 3, 4, 5
  images: string[]
  author: ReviewAuthor
}

export interface ReviewListResponse {
  count: number
  rivews: Review[]
}
