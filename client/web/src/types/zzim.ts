export interface ZzimItem {
  productId: number
  name: string
  minPrice: number
  thumbnail: string
  hits: number
  type: string
}

export interface ZzimRecord {
  zzimId: number
  item: ZzimItem
}

export interface ZzimListResponse {
  userId: number
  count: number
  zzims: ZzimRecord[]
}
