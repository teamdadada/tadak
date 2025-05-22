import {
  kakaoLogin,
  naverLogin,
  refreshToken,
  signIn,
} from '@/services/authService'
import { getUserInfo } from '@/services/userService'
import { getZzimList } from '@/services/zzimService'
import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { ErrorResponse, User } from '@/types/user'
import { ZzimListResponse } from '@/types/zzim'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useSignIn = () => {
  const setUser = useUserStore((state) => state.setUser)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    onSuccess: async (accessToken) => {
      if (!accessToken) {
        toast.error('로그인에 실패하였습니다.')
        return
      }

      try {
        const userInfo: User = await getUserInfo()
        setUser(userInfo)

        const userZzimList: ZzimListResponse = await getZzimList()
        setZzimList(userZzimList)

        toast.success('로그인 성공!')
      } catch (e) {
        console.error('getUserInfo 에러 발생:', e)
        toast.error('사용자 정보를 가져오는데 실패했습니다.')
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status == 401 && code === 'B4010') {
        toast.error('아이디 또는 비밀번호를 확인해주세요.')
      } else if (status == 500) {
        toast.error(message)
      } else {
        toast.error('로그인에 실패하였습니다. 다시 시도해주세요.')
      }
    },
  })
  return mutateAsync
}

export const useNaverLogin = () => {
  const isProcessingRef = useRef(false)
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const login = async (code: string, redirectPath: string) => {
    if (isProcessingRef.current) return
    isProcessingRef.current = true

    try {
      const start = Date.now()

      await naverLogin(code)

      const userInfo = await getUserInfo()
      setUser(userInfo)

      const userZzimList: ZzimListResponse = await getZzimList()
      setZzimList(userZzimList)

      const elapsed = Date.now() - start
      if (elapsed < 500) {
        await new Promise((r) => setTimeout(r, 500 - elapsed))
      }

      toast.success('네이버 로그인 성공!')
      navigate(redirectPath, { replace: true })
    } catch (err) {
      console.error('네이버 로그인 오류:', err)
      toast.error('로그인 중 문제가 발생했습니다.')
      navigate('/account/login', { replace: true })
    }
  }

  return { login }
}

export const useKakaoLogin = () => {
  const isProcessingRef = useRef(false)
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const login = async (code: string, redirectPath: string) => {
    if (isProcessingRef.current) return
    isProcessingRef.current = true

    try {
      const start = Date.now()

      await kakaoLogin(code)

      const userInfo = await getUserInfo()
      setUser(userInfo)

      const userZzimList: ZzimListResponse = await getZzimList()
      setZzimList(userZzimList)

      const elapsed = Date.now() - start
      if (elapsed < 500) {
        await new Promise((r) => setTimeout(r, 500 - elapsed))
      }

      toast.success('카카오 로그인 성공!')
      navigate(redirectPath, { replace: true })
    } catch (err) {
      console.error('카카오 로그인 오류:', err)
      toast.error('로그인 중 문제가 발생했습니다.')
      navigate('/account/login', { replace: true })
    }
  }

  return { login }
}

export const useRefreshToken = () => {
  const { mutateAsync } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      if (!data.success) {
        console.log('토큰 갱신 실패: ', data.error)
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code

      if (status === 400 && code === 'B4000') {
        toast.error('로그인 정보가 만료되었습니다. 다시 로그인해 주세요.')
      } else if (status === 401 && code === 'B4012') {
        toast.error('인증이 만료되었습니다. 다시 로그인해 주세요.')
      } else {
        toast.error('인증 과정에서 오류가 발생했습니다. 다시 로그인해 주세요.')
      }

      useAuthStore.getState().clearAccessToken()
      window.location.href = '/account/login'
    },
  })

  return mutateAsync
}
