import { signIn } from '@/services/authService'
import { ErrorResponse } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useSignIn = () => {
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success('로그인 성공! 🧡')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
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
  return mutateAsync
}
