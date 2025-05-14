import { signIn } from '@/services/authService'
import {
  getUserInfo,
  signUp,
  updateNickname,
  updateProfileImg,
} from '@/services/userService'
import {
  ErrorResponse,
  SignUpRequest,
  UpdateNicknameRequest,
  UpdateProfileImgRequest,
  User,
} from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
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

export const useGetUserInfo = () => {
  return useQuery<User>({
    queryKey: ['user', 'me'],
    queryFn: getUserInfo,
  })
}

export const useUpdateNickname = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateNicknameRequest) => updateNickname(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
      toast.success('닉네임이 수정되었습니다!')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status == 401 && code === 'B4011') {
        navigate('/account/login', { replace: true })
        toast.error(message) // 로그인되지 않은 사용자입니다.
      } else if (status == 404 && code === 'U4040') {
        navigate('/account/login', { replace: true })
        toast.error(message) // 해당하는 유저를 찾을 수 없습니다.
      }
    },
  })
  return mutateAsync
}

export const useUpdateProfileImg = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateProfileImgRequest) => updateProfileImg(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
      toast.success('프로필 이미지가 변경되었습니다!')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status === 400 && code === 'U4000') {
        toast.error('프로필 이미지를 다시 업로드해주세요.')
      } else if (status == 401 && code === 'B4011') {
        navigate('/account/login', { replace: true })
        toast.error(message) // 로그인되지 않은 사용자입니다.
      } else if (status == 404 && code === 'U4040') {
        navigate('/account/login', { replace: true })
        toast.error(message) // 해당하는 유저를 찾을 수 없습니다.
      }
    },
  })
  return mutateAsync
}
