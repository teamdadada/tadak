import http from '@/services/http-common'
import { CART_END_POINT } from './endPoints'
import { cartItem } from '@/types/cart'

// TODO: 장바구니에 키보드 담기
export const addToCart = async (payload: any) => {
  const response = await http.post(CART_END_POINT.ADD, payload)
  return response.data
}

export const getCart = async (): Promise<cartItem[]> => {
  const { data } = await http.get(CART_END_POINT.LIST)
  return data
}

export const deleteCart = async (keyboardIdList: number[]) => {
  return await http.delete(CART_END_POINT.DELETE, {
    data: { keyboardIdList },
  })
}
