import http from '@/services/http-common'
import { CART_END_POINT } from './endPoints'

// TODO: 장바구니에 키보드 담기
export const addToCart = async (payload: any) => {
  const response = await http.post(CART_END_POINT.ADD, payload)
  return response.data
}