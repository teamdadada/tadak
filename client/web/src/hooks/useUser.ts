import { signUp } from "@/services/userService"
import { ErrorResponse } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useSignUp = () => {
  const { mutateAsync } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      const message = error.response?.data?.message

      if (status === 409) {
        toast.error(message)
      } else {
        toast.error('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    },
  })

  return mutateAsync
}
