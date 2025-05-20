import http from '@/services/http-common'
import { KEYBOARD_END_POINT } from './endPoints'
import { KeyboardSummary, KeyboardOptionsResponse } from '@/types/keyboard'

// 키보드 목록 조회
export const fetchKeyboardList = async (): Promise<KeyboardSummary[]> => {
  const response = await http.get(KEYBOARD_END_POINT.LIST)
  return response.data
}

// TODO: 키보드 디자인 등록
export const createKeyboard = async (payload: any) => {
  const response = await http.post(KEYBOARD_END_POINT.CREATE, payload)
  return response.data
}
  
// TODO: 유저가 디자인한 키보드 상세 조회
export const fetchKeyboardDetail = async (keyboardId: number) => {
  const response = await http.get(KEYBOARD_END_POINT.DETAIL(keyboardId))
  return response.data
}
  
// TODO: 키보드 디자인 수정
export const updateKeyboard = async (keyboardId: number, payload: any) => {
  const response = await http.patch(KEYBOARD_END_POINT.UPDATE(keyboardId), payload)
  return response.data
}

// 키보드 디자인 삭제
export const deleteKeyboard = async (keyboardId: number) => {
  const response = await http.delete(KEYBOARD_END_POINT.DELETE(keyboardId))
  return response.data
}

// 키보드 추가 버튼 눌렀을 때 카테고리별 선택지 조회
export const fetchKeyboardOptions = async (): Promise<KeyboardOptionsResponse> => {
  const response = await http.get<KeyboardOptionsResponse>(KEYBOARD_END_POINT.OPTION)
  // console.log(response.data)
  return response.data
}

// 카테고리별 키보드 상품 목록 조회
// 베어본
export const fetchBareboneProduct = async (layoutId: number, materialId: number) => {
  const response = await http.get(KEYBOARD_END_POINT.BAREBONE_PRODUCTS(layoutId, materialId))
  return response.data
}

// 스위치
export const fetchSwitchProduct = async (typeId: number) => {
  const response = await http.get(KEYBOARD_END_POINT.SWITCH_PRODUCTS(typeId))
  return response.data
}

// 키캡
export const fetchKeycapProduct = async () => {
  const response = await http.get(KEYBOARD_END_POINT.KEYCAP_PRODUCTS)
  return response.data
}

// TODO: 특정 키보드의 상품 정보 변경
export const updateKeyboardProducts = async (keyboardId: number, payload: any) => {
  const response = await http.put(KEYBOARD_END_POINT.UPDATE_PRODUCTS(keyboardId), payload)
  return response.data
}

// TODO: 3D 모델 정보 조회
export const fetchKeyboardModel3D = async (keyboardId: number) => {
  const response = await http.get(KEYBOARD_END_POINT.MODEL_3D(keyboardId))
  return response.data
}

// TODO: 키보드 배치 정보 저장
// export const saveKeyboardArrangement = async (payload: any) => {
//   const response = await http.post(KEYBOARD_END_POINT.SAVE_ARRANGEMENT, payload)
//   return response.data
// }