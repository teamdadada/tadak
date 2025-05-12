export enum ProductType {
  BAREBONE = 'BAREBONE',
  SWITCH = 'SWITCH',
  KEYCAP = 'KEYCAP',
}

export interface Product {
  productId: number
  name: string
  minPrice: number
  thumbnail: string
  type?: ProductType
  liked?: boolean
}

export interface ProductListResponse {
  list: Product[]
  hasNext: boolean
  lastCursor: string | null
}

// export interface ProductListResponse {
//   content: Product[]
//   totalPages: number
//   totalElements: number
//   pageNumber: number
//   pageSize: number
// }

export type GenericFilterResponse = {
  [key: string]: string[] | number | undefined
}

export interface BareboneFilter extends GenericFilterResponse {
  manufacturer: string[]
  keyLayout: string[]
  features: string[]
}

export interface SwitchFilter extends GenericFilterResponse {
  keyForce: string[]
  switchType: string[]
  quantity: string[]
}

export interface KeycapFilter extends GenericFilterResponse {
  keyCount: string[]
  engravingPosition: string[]
  keycapMaterial: string[]
}

export type PriceFilter = {
  minPriceMin?: number
  minPriceMax?: number
}

export type FilterByType<T extends string> = T extends 'BAREBONE'
  ? Partial<BareboneFilter & PriceFilter>
  : T extends 'SWITCH'
    ? Partial<SwitchFilter & PriceFilter>
    : T extends 'KEYCAP'
      ? Partial<KeycapFilter & PriceFilter>
      : never

// export interface BearboneFilterRequest {
//   manufacturer: string[]
//   keyLayout: string[]
//   features: string[]
//   minPriceMin?: number
//   minPriceMax?: number
// }

// export interface SwitchFilterRequest {
//   switchType: string[]
//   keyForce: string[]
//   quantity: string[]
//   minPriceMin?: number
//   minPriceMax?: number
// }

// export interface KeycapFilterRequest {
//   keycapMaterial: string[]
//   engravingPosition: string[]
//   keyCount: string[]
//   minPriceMin?: number
//   minPriceMax?: number
// }
