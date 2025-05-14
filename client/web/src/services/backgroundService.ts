import http from '@/services/http-common'
import { BACKGROUND_END_POINT } from './endPoints'
// import { BackgroundImage } from '@/types/background'
import { mockBackgroundList } from '@/mocks/background/mockBackgroundList'

// 배경 이미지 목록 조회
// Mock 데이터
export const fetchBackgroundList = async () => {
  return mockBackgroundList // 목업 데이터 반환
}

// 실제 API
// export const fetchBackgroundList = async (): Promise<BackgroundImage[]> => {
//   const response = await http.get(BACKGROUND_END_POINT.LIST)
//   return response.data
// }

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