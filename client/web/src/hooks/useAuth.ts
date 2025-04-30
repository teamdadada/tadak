import { getAuthCheck, signIn } from "@/services/authService"
import { ErrorResponse } from "@/types/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


export const useSignIn = () => {
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      // 액세스 토큰 저장 로직 추가
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

export const useGetAuthCheck = () => {
  useQuery({
    queryKey: ['authCheck'],
    queryFn: () => getAuthCheck()
  })
}
