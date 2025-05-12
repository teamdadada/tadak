import { refreshToken, signIn } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { ErrorResponse } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useSignIn = () => {
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    onSuccess: async (accessToken) => {
      if (!accessToken) {
        toast.error('로그인에 실패하였습니다.')
        return
      }

      try {
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
