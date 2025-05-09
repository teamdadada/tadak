import http from './http-common'

import { USER_END_POINT } from './endPoints'
import { MyProfile, SignUpRequest } from '@/types/user'

export const signUp = async (data: SignUpRequest) => {
  const response = await http.post(USER_END_POINT.SIGNUP, data)
  return response
}

export const getMyProfile = async () => {
  const response = await http.get<MyProfile>(USER_END_POINT.ME)
  return response.data
}
