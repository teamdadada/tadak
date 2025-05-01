// import axios from 'axios'
// import { SHOP_END_POINT } from './endPoints'

import bearboneMock from '@/mocks/shop/bearboneFilters.json'
import switchMock from '@/mocks/shop/switchFilters.json'
import keycapMock from '@/mocks/shop/keycapFilters.json'
import bearboneList from '@/mocks/shop/bearboneProducts.json'
import switchList from '@/mocks/shop/switchProducts.json'
import keycapList from '@/mocks/shop/keycapProducts.json'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  liked: boolean
}

interface FilterResponse {
  [key: string]: string[] // ex. { manufacturers: ["Keychron", "COX"], ... }
}

interface ProductRequest {
  [key: string]: any // ex. { priceRange: [10000, 50000], layout: ['60%'] }
}

export const getBearboneFilters = async (): Promise<FilterResponse> => {
  //   const { data } = await axios.get(SHOP_END_POINT.FILTER.BEARBONE)
  //   return data
  return new Promise(
    (resolve) => setTimeout(() => resolve(bearboneMock), 300), // 0.3초 딜레이로 실제처럼
  )
}

export const getSwitchFilters = async (): Promise<FilterResponse> => {
  //   const { data } = await axios.get(SHOP_END_POINT.FILTER.SWITCH)
  //   return data
  return new Promise((resolve) => setTimeout(() => resolve(switchMock), 300))
}

export const getKeycapFilters = async (): Promise<FilterResponse> => {
  //   const { data } = await axios.get(SHOP_END_POINT.FILTER.KEYCAP)
  //   return data
  return new Promise((resolve) => setTimeout(() => resolve(keycapMock), 300))
}

export const getBearboneProducts = async (
  filters: ProductRequest,
): Promise<Product[]> => {
  // const { data } = await axios.post(SHOP_END_POINT.PRODUCT.BEARBONE, filters)
  // return data
  return new Promise((resolve) => setTimeout(() => resolve(bearboneList), 300))
}

export const getSwitchProducts = async (
  filters: ProductRequest,
): Promise<Product[]> => {
  // const { data } = await axios.post(SHOP_END_POINT.PRODUCT.SWITCH, filters)
  // return data
  return new Promise((resolve) => setTimeout(() => resolve(switchList), 300))
}

export const getKeycapProducts = async (
  filters: ProductRequest,
): Promise<Product[]> => {
  // const { data } = await axios.post(SHOP_END_POINT.PRODUCT.KEYCAP, filters)
  // return data
  return new Promise((resolve) => setTimeout(() => resolve(keycapList), 300))
}
