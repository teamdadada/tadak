import http from './http-common'
import { MAIN_END_POINT } from './endPoints'

interface FetchItemsParams {
  type: 'BAREBONE' | 'SWITCH' | 'KEYCAP'
  sort: 'POPULAR' | 'LATEST'
  size?: number
}

export const fetchItems = async ({ type, sort, size = 4 }: FetchItemsParams) => {
  // console.log('📦 [fetchItems] 요청:', {
  //   url: MAIN_END_POINT.PRODUCT_LIST,
  //   params: { type, sort, size },
  // })

  try {
    const response = await http.get(MAIN_END_POINT.PRODUCT_LIST, {
      params: { type, sort, size },
    })
    // console.log('✅ [fetchItems] 응답:', response.data)
    return response.data.list // API 응답 구조에 맞춰 list만 반환
  } catch (error) {
    // console.error('❌ [fetchItems] 에러:', error)
    throw error
  }
}