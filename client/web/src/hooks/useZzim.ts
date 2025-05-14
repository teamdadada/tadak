import { addZzim, listZzim } from '@/services/zzimService'
import { ErrorResponse } from '@/types/user'
import { ZzimListResponse } from '@/types/zzim'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useAddZzim = () => {
  const { mutateAsync } = useMutation({
    mutationFn: addZzim,
    onSuccess: () => {},
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message
      toast.error(message)
    },
  })
  return mutateAsync
}

export const useListZzim = () => {
  return useQuery<ZzimListResponse>({
    queryKey: ['zzim', 'list'],
    queryFn: listZzim,
  })
}
