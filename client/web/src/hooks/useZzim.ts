import { addZzim, getZzimList } from '@/services/zzimService'
import { useUserStore } from '@/store/userStore'
import { ErrorResponse } from '@/types/user'
import { ZzimListResponse } from '@/types/zzim'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useAddZzim = () => {
  const queryClient = useQueryClient()
  // const addZzimItem = useUserStore((state) => state.addZzimItem)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const { mutateAsync } = useMutation({
    mutationFn: addZzim,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['zzim'] })
      try {
        const zzimListResponse = await getZzimList()
        setZzimList(zzimListResponse)
      } catch {
        // 에러 처리
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message
      toast.error(message)
    },
  })
  return mutateAsync
}

export const useGetZzimList = () => {
  return useQuery<ZzimListResponse>({
    queryKey: ['zzim', 'list'],
    queryFn: getZzimList,
  })
}
