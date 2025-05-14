import http from './http-common'

import { ZZIM_END_POINT } from './endPoints'
import { ZzimListResponse } from '@/types/zzim'

export const addZzim = async (productId: number) => {
  const response = await http.post(ZZIM_END_POINT.ADD(productId))
  return response
}

export const listZzim = async () => {
  const response = await http.get<ZzimListResponse>(ZZIM_END_POINT.LIST)
  return response.data
}
