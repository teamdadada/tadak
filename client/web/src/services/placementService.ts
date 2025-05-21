import http from './http-common'
import { PLACEMENT_END_POINT } from './endPoints'

// 배치 정보 저장
export const createPlacement = async (data: { imageId: number }) => {
  const response = await http.post(PLACEMENT_END_POINT.CREATE, data)
  return response.data
}

// 배치 정보 수정
export const updatePlacement = async (data: { placementId: number; imageId: number }) => {
  const response = await http.patch(PLACEMENT_END_POINT.UPDATE, data)
  return response.data
}

// 배치 정보 삭제
export const deletePlacement = async (placementId: number) => {
  const response = await http.delete(PLACEMENT_END_POINT.DELETE(placementId))
  return response.data
}

// 배치 상세 조회
export const getPlacementDetail = async (placementId: number) => {
  const response = await http.get(PLACEMENT_END_POINT.DETAIL(placementId))
  return response.data
}

// 배치 리스트 조회
export const getPlacementList = async () => {
  const response = await http.get(PLACEMENT_END_POINT.LIST)
  return response.data
}

// 디폴트 배치 정보 조회
export const getDefaultPlacement = async () => {
  const response = await http.get(PLACEMENT_END_POINT.DEFAULT)
  return response.data
}