import { addZzim, getZzimList } from '@/services/zzimService'
import { ErrorResponse } from '@/types/user'
import { ZzimListResponse } from '@/types/zzim'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useAddZzim = () => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: addZzim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zzim'] })
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
