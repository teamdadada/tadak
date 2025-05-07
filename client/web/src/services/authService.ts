import http from './http-common'

import { AUTH_END_POINT } from './endPoints'
import { SignInRequest } from '@/types/auth'
import { useAuthStore } from '@/store/authStore'

export const signIn = async (data: SignInRequest) => {
  const response = await http.post(AUTH_END_POINT.LOGIN, data)
  const authHeader = response.headers['authorization']
  if (authHeader) {
    const accessToken = authHeader.replace('Bearer ', '').trim()
    useAuthStore.getState().setAccessToken(accessToken)
  }

  return response
}

export const checkAuthStatus = async () => {
  const response = await http.get(AUTH_END_POINT.CHECK)
  return response.status
}

import axios from 'axios'

const refreshHttp = axios.create({
  baseURL: 'https://dapi.tadak.kr',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const refreshToken = async () => {
  try {
    const response = await refreshHttp.post(AUTH_END_POINT.REISSUE)
    const authHeader = response.headers['authorization']

    if (authHeader) {
      const accessToken = authHeader.replace('Bearer ', '').trim()
      useAuthStore.getState().setAccessToken(accessToken)
      return { success: true, accessToken }
    }

    return { success: false, error: '토큰이 응답 헤더에 없습니다.' }
  } catch (error) {
    return { success: false, error }
  }
}
