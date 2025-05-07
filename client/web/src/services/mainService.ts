import http from './http-common'
import { MAIN_END_POINT } from './endPoints'

export const fetchPopularItems = async (
  productType: string,
  params?: { page?: number; size?: number; minPriceMin?: number; minPriceMax?: number }
) => {
  console.log('📦 [fetchPopularItems] 요청:', {
    url: MAIN_END_POINT.POPULAR_ITEMS(productType),
    params,
  })

  try {
    const response = await http.get(MAIN_END_POINT.POPULAR_ITEMS(productType), {
      params,
    })
    console.log('✅ [fetchPopularItems] 응답:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ [fetchPopularItems] 에러:', error)
    throw error
  }
}

export const fetchLatestItems = async (
  productType: string,
  params?: { page?: number; size?: number; minPriceMin?: number; minPriceMax?: number }
) => {
  console.log('📦 [fetchLatestItems] 요청:', {
    url: MAIN_END_POINT.LATEST_ITEMS(productType),
    params,
  })

  try {
    const response = await http.get(MAIN_END_POINT.LATEST_ITEMS(productType), {
      params,
    })
    console.log('✅ [fetchLatestItems] 응답:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ [fetchLatestItems] 에러:', error)
    throw error
  }
}