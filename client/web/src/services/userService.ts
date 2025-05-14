import http from './http-common'

import { USER_END_POINT } from './endPoints'
import {
  User,
  SignUpRequest,
  UpdateNicknameRequest,
  UpdateProfileImgRequest,
  UpdatePasswordRequest,
} from '@/types/user'

export const signUp = async (data: SignUpRequest) => {
  const response = await http.post(USER_END_POINT.SIGNUP, data)
  return response
}

export const getUserInfo = async () => {
  const response = await http.get<User>(USER_END_POINT.ME)
  return response.data
}

export const updateNickname = async (data: UpdateNicknameRequest) => {
  const response = await http.patch(USER_END_POINT.NICKNAME, data)
  return response
}

export const updateProfileImg = async (data: UpdateProfileImgRequest) => {
  const formData = new FormData()
  formData.append('file', data.file)

  const response = await http.patch(USER_END_POINT.IMG, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}

export const updatePassword = async (data: UpdatePasswordRequest) => {
  const response = await http.patch(USER_END_POINT.PASSWORD, data)
  return response
}
