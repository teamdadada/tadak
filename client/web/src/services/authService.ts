import http from './http-common'

import { AUTH_END_POINT } from './endPoints'
import { SignInRequest } from '@/types/auth'

export const signIn = async (data: SignInRequest) => {
  const response = await http.post(AUTH_END_POINT.LOGIN, data)
  return response
}

export const getAuthCheck = async () => {
  const response = await http.get(AUTH_END_POINT.CHECK)
  return response
}
