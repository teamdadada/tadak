import http from '@/services/http-common'
import { MINIO_END_POINT } from './endPoints'

// TODO: S3(Minio) 이미지 업로드
export const uploadImageToMinio = async (bucketName: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await http.post(MINIO_END_POINT.UPLOAD(bucketName), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data // { imageId: number, url: string }
}