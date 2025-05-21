import { signIn } from '@/services/authService'
import {
  getUserInfo,
  signUp,
  updateNickname,
  updatePassword,
  updateProfileImg,
} from '@/services/userService'
import { getZzimList } from '@/services/zzimService'
import { useUserStore } from '@/store/userStore'
import {
  ErrorResponse,
  SignUpRequest,
  UpdateNicknameRequest,
  UpdatePasswordRequest,
  UpdateProfileImgRequest,
  User,
} from '@/types/user'
import { ZzimListResponse } from '@/types/zzim'
import { logoutUtil } from '@/utils/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useSignUp = () => {
  const setUser = useUserStore((state) => state.setUser)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const { mutateAsync } = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      // 회원가입
      const signUpResponse = await signUp(data)

      // 자동 로그인
      await signIn({ userId: data.userId, password: data.password })

      const userInfo: User = await getUserInfo()
      setUser(userInfo)

      const userZzimList: ZzimListResponse = await getZzimList()
      setZzimList(userZzimList)

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

export const useLogout = () => {
  const queryClient = useQueryClient()

  const logout = () => {
    queryClient.clear()

    logoutUtil(undefined, '/main')
  }

  return logout
}

export const useGetUserInfo = () => {
  return useQuery<User>({
    queryKey: ['user', 'me'],
    queryFn: getUserInfo,
  })
}

export const useUpdateNickname = () => {
  // const queryClient = useQueryClient()
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateNicknameRequest) => updateNickname(data),

    onSuccess: (_, variables) => {
      if (user) {
        setUser({
          ...user,
          userName: variables.nickname,
        })
      }

      toast.success('닉네임이 변경되었습니다!')
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
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProfileImgRequest) => {
      const response = await updateProfileImg(data)
      const profileImgURL = response.headers.location
      return { response, profileImgURL }
    },

    onSuccess: (result) => {
      if (user && result.profileImgURL) {
        setUser({
          ...user,
          profileImg: result.profileImgURL,
        })
      }

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

export const useUpdatePassword = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdatePasswordRequest) => updatePassword(data),
    onSuccess: () => {
      toast.success('비밀번호가 성공적으로 변경되었습니다!')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status === 401 && code === 'U4010') {
        toast.error(message)
      } else if (
        (status == 401 && code === 'B4011') ||
        (status == 404 && code === 'U4040')
      ) {
        navigate('/account/login', { replace: true })
        toast.error(message)
      }
    },
  })

  return mutateAsync
}
