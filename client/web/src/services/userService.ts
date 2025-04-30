import http from './http-common'
import { USER_END_POINT } from './endPoints'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

// // 로그인
// // 예시로 작성해 둔 것이라 필요에 따라 수정 가능
// export const fetchSocialLogin = async (
//   socialType: string,
//   code: string,
// ): Promise<{ accessToken: string; userId: string; isNew: boolean }> => {
//   try {
//     const response = await http.post(
//       USER_END_POINT.SOCIAL_LOGIN(socialType, code),
//     )

//     const { accessToken, userId, isNew } = response.data?.result ?? {}

//     if (!accessToken || !userId) {
//       throw new Error('accessToken 또는 userId 없음')
//     }

//     return { accessToken, userId, isNew }
//   } catch (error: any) {
//     const message =
//       error.response?.data?.message || '소셜 로그인 중 문제가 발생했습니다.'

//     const matchedSocial = message.includes('KAKAO')
//       ? 'kakao'
//       : message.includes('NAVER')
//         ? 'naver'
//         : null

//     throw {
//       message,
//       socialType: matchedSocial,
//     }
//   }
// }

// // 로그아웃
// // 예시로 작성해 둔 것이라 필요에 따라 수정 가능
// export const logout = async (): Promise<void> => {
//   await http.post(USER_END_POINT.LOGOUT)
// }

interface SignUpRequest {
  userId: string
  password: string
  nickname: string
}

interface SignInRequest {
  userId: string
  password: string
}

interface ErrorResponse {
  status: number
  code: string
  message: string
}

const signUp = async (data: SignUpRequest) => {
  const response = await http.post(USER_END_POINT.SIGNUP, data)
  return response
}

export const useSignUp = () => {
  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      if (response.status == 201) {
        // 로그인 후 홈 화면 리다이렉트 로직 추가 예정
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status === 409 && code === 'U4090') {
        toast.error(message ?? '이미 존재하는 아이디입니다.')
      } else {
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    },
  })

  return mutate
}

const signIn = async (data: SignInRequest) => {
  const response = await http.post(USER_END_POINT.LOGIN, data)
  return response
}

export const useSignIn = () => {
  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {},
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      // const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status == 401) {
        toast.error(message)
      } else if (status == 500) {
        toast.error(message)
      } else {
        toast.error('로그인에 실패하였습니다. 다시 시도해주세요.')
      }
    },
  })
  return mutate
}
