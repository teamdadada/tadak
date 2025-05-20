export interface Product {
  productId: number
  name: string
  price: number
  quantity: number
  imageUrl: string | null
  minPrice?: number         // 누락되었던 속성 추가
  thumbnail?: string        // 누락되었던 속성 추가
}

// 베어본 상세 정보
export interface BareboneDetail {
  name: string
  minPrice: number
  manufacturer: string
  layout: string
  material: string
  outerColor: string
  features?: string[]
}

// 스위치 상세 정보
export interface SwitchDetail {
  name: string
  minPrice: number
  type: string
  keyForce?: number
  quantity?: number
}

// 키캡 상세 정보
export interface KeycapDetail {
  name: string
  minPrice: number
  keycapMaterial: string
  keyCount: number
  basicColor: string
  pointOption: 'none' | 'set' | 'custom'
  pointColors?: Record<string, string>
}

// 모든 타입에서 공통으로 사용하는 기본 타입
export interface ProductDetailBase {
  productId: number
  name: string
  price: number
  imageUrl: string | null
  minPrice: number
  thumbnail: string
}