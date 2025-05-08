import http, { refreshHttp } from './http-common'

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

export const kakaoLogin = async (code: string) => {
  const environment = import.meta.env.VITE_ENVIRONMENT

  const response = await http.post(AUTH_END_POINT.KAKAOLOGIN, null, {
    headers: {
      'X-Author-Code': code,
      'X-Environment': environment,
    },
  })

  const authHeader = response.headers['authorization']
  if (authHeader) {
    const accessToken = authHeader.replace('Bearer ', '').trim()
    useAuthStore.getState().setAccessToken(accessToken)
  }

  return response
}
