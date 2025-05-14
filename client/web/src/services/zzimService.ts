import { ZZIM_END_POINT } from './endPoints'
import http from './http-common'

export const addZzim = async (productId: number) => {
  const response = await http.post(ZZIM_END_POINT.ADD(productId))
  return response
}
