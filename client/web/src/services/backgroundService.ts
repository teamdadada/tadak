import http from '@/services/http-common'
import { BACKGROUND_END_POINT } from './endPoints'

// 배경 이미지 목록 조회
export const fetchBackgroundList = async () => {
  const response = await http.get(BACKGROUND_END_POINT.LIST)
  return response.data
}

// 배경 이미지 삭제
export const deleteBackground = async (backgroundId: number) => {
  const response = await http.delete(BACKGROUND_END_POINT.DELETE(backgroundId))
  return response.data
}

// TODO: 배경 이미지 업로드
export const uploadBackgroundImage = async (
  imageId: number,
  isDefault: boolean = false
) => {
  const payload = {
    imageId,
    isDefault,
    }

  const response = await http.post(BACKGROUND_END_POINT.CREATE, payload)
  return response.data
}