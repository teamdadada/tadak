import { toast } from 'sonner'
import { uploadImageToMinio } from '@/services/minioService'
import { createPlacement } from '@/services/placementService'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import mockDesk1 from '@/assets/images/mock-desk-1.png'
import mockDesk2 from '@/assets/images/mock-desk-2.png'

interface DeskModalProps {
  onClose: () => void
}

const DeskModal = ({ onClose }: DeskModalProps) => {
  const { mutateAsync: savePlacement } = useMutation({
    mutationFn: createPlacement,
  })

  const handleUploadClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        toast.error('이미지 파일(png, jpg, jpeg)만 업로드할 수 있어요.')
        return
      }

      try {
        const { imageId } = await uploadImageToMinio('background', file)
        toast.success('이미지 업로드 성공!')

        await savePlacement({ imageId })
        toast.success('배치 정보 저장 완료!')
        onClose() // refetchPlacements는 부모에서 호출
      } catch (error) {
        console.error('업로드 실패:', error)
        toast.error('업로드 중 오류가 발생했어요.')
      }
    }

    input.click()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="relative bg-white w-[520px] h-[420px] rounded-xl p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl text-tadak-black font-semibold mt-4 mb-2">📸 이미지 업로드</h2>
        <p className="text-sm text-tadak-dark-gray font-semibold mb-6">
          정면 또는 약간 위에서 촬영해주세요.
        </p>
        <p className="text-sm text-tadak-primary font-medium mb-2">📌 아래 예시처럼 촬영해 주세요!</p>

        <div className="flex gap-4 justify-center mb-8">
          <img src={mockDesk1} alt="예시1" className="w-60 h-40 object-cover rounded" />
          <img src={mockDesk2} alt="예시2" className="w-60 h-40 object-cover rounded" />
        </div>

        <button
          onClick={handleUploadClick}
          className="w-full h-12 bg-tadak-secondary text-white rounded-lg hover:bg-tadak-light-secondary hover:text-tadak-secondary"
        >
          사진 업로드 하기
        </button>
      </div>
    </div>
  )
}

export default DeskModal