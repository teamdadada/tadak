import {
  addZzim,
  deleteZzim,
  getZzimCount,
  getZzimList,
} from '@/services/zzimService'
import { useUserStore } from '@/store/userStore'
import { ErrorResponse } from '@/types/user'
import { ZzimCountResponse, ZzimListResponse } from '@/types/zzim'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useAddZzim = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // const addZzimItem = useUserStore((state) => state.addZzimItem)
  const setZzimList = useUserStore((state) => state.setZzimList)

  const { mutateAsync } = useMutation({
    mutationFn: addZzim,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['zzim'] })
      toast.success('찜 목록에 추가되었습니다!')
      try {
        const zzimListResponse = await getZzimList()
        setZzimList(zzimListResponse)
      } catch {
        // 에러 처리
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const status = error.response?.status
      // const code = error.response?.data?.code
      const message = error.response?.data?.message

      if (status == 401) {
        navigate('/account/login', { replace: true })
        toast.error('로그인 후 이용하실 수 있습니다.')
      } else {
        toast.error(message)
      }
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

export const useDeleteZzim = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: deleteZzim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zzim'] })
      toast.success('찜 목록에서 제거되었습니다!')
    },
  })
  return mutateAsync
}

export const useGetZzimCount = () => {
  return useQuery<ZzimCountResponse>({
    queryKey: ['zzim', 'count'],
    queryFn: getZzimCount,
  })
}
