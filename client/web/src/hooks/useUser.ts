import { signIn } from '@/services/authService'
import { getMyProfile, signUp } from '@/services/userService'
import { ErrorResponse, MyProfile, SignUpRequest } from '@/types/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useSignUp = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      // 회원가입
      const signUpResponse = await signUp(data)

      // 자동 로그인
      await signIn({ userId: data.userId, password: data.password })

      return signUpResponse
    },
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다 🎉')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status === 409 && code === 'U4090') {
        toast.error(message)
      } else {
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    },
  })

  return mutateAsync
}

export const useGetMyProfile = () => {
  return useQuery<MyProfile>({
    queryKey: ['user', 'me'],
    queryFn: getMyProfile,
  })
}
