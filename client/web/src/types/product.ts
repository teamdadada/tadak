export interface ProductDetailBase {
  productId: number
  name: string
  manufacturer: string
  minPrice: number
  thumbnail: string
  detailImage: string
  url: string
  hits: number
}

export interface BareboneDetail extends ProductDetailBase {
  releaseYear: number
  releaseMonth: number
  features: string[]
  keyLayout: string
  size?: string
  connectionType?: string
  contactType?: string
  interfaceType?: string
}

export interface KeycapDetail extends ProductDetailBase {
  releaseYear: number
  releaseMonth: number
  keycapMaterial: string
  engravingPosition: string
  keyCount: string
}

export interface SwitchDetail extends ProductDetailBase {
  releaseYear: number
  releaseMonth: number
  quantity: string
  switchType: string
  keyForce: string
}
