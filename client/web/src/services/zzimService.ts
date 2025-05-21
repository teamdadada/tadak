import http from './http-common'

import { ZZIM_END_POINT } from './endPoints'
import { ZzimCountResponse, ZzimListResponse } from '@/types/zzim'

export const addZzim = async (productId: number) => {
  const response = await http.post(ZZIM_END_POINT.ADD(productId))
  return response
}

export const getZzimList = async () => {
  const response = await http.get<ZzimListResponse>(ZZIM_END_POINT.LIST)
  return response.data
}

export const deleteZzim = async (zzimId: number) => {
  const response = await http.delete(ZZIM_END_POINT.DELETE(zzimId))
  return response
}

export const getZzimCount = async () => {
  const response = await http.get<ZzimCountResponse>(ZZIM_END_POINT.COUNT)
  return response.data
}
