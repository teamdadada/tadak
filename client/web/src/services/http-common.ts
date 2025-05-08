import axios from 'axios'
import { refreshToken } from './authService'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

// 환경에 따른 baseURL 설정
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // refreshToken 쿠키로 보낼 수 있도록 설정
})

export const refreshHttp = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 요청 인터셉터: accessToken 자동 첨부
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      error.response?.data.code == 'B4012' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const result = await refreshToken()

        if (result.success) {
          originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
          return http(originalRequest)
        } else {
          toast.error('로그인이 필요합니다. 다시 로그인해 주세요.')
          useAuthStore.getState().clearAccessToken()
          window.location.href = '/account/login'
          return Promise.reject(error)
        }
      } catch (refreshError) {
        toast.error('인증 과정에서 오류가 발생했습니다. 다시 로그인해 주세요.')
        useAuthStore.getState().clearAccessToken()
        window.location.href = '/account/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default http
