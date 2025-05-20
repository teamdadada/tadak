import { uploadImageToMinio } from '@/services/minioService'
import { createKeyboard } from '@/services/keyboardService'
import { toast } from 'sonner'

interface FinalActionsProps {
  keyboardName: string
  layout: string
  material: string
  outerColor: string
  basicColor: string
  pointColor: string
  pointOption: 'none' | 'set' | 'custom'
  customKeyMap: Record<string, string>
  selectedProductIds: number[] // [barebone, switch, keycap]
  totalPrice: number
  exportGLB?: () => Promise<Blob>
  captureImage?: () => Promise<Blob>
}

const FinalActions = ({
  keyboardName,
  layout,
  material,
  outerColor,
  basicColor,
  pointColor,
  pointOption,
  customKeyMap,
  selectedProductIds,
  totalPrice,
  exportGLB,
  captureImage,
}: FinalActionsProps) => {
  const handleSaveOnly = async () => {
    try {
      // 0. 이름 유효성 검사
      if (!keyboardName.trim()) {
        toast.error('키보드 이름을 입력해주세요.')
        return
      }

      // 1. 이미지 캡처
      if (!captureImage) throw new Error('Capture image function not provided')
      const capturedBlob = await captureImage()
      const capturedFile = new File([capturedBlob], 'preview.png', { type: 'image/png' })

      // 2. GLB export
      if (!exportGLB) throw new Error('GLB export function not provided')
      const glbBlob = await exportGLB()
      const glbFile = new File([glbBlob], 'keyboard.glb', { type: 'model/gltf-binary' })
      console.log('[GLB 파일]', glbFile)

      // 3. 이미지, 모델 업로드
      const [imageRes, modelRes] = await Promise.all([
        uploadImageToMinio('keyboard', capturedFile),
        uploadImageToMinio('model', glbFile),
      ])
      console.log('[이미지 업로드 응답]', imageRes)
      console.log('[모델 업로드 응답]', modelRes)

      // 5. API 요청
      const [layoutId, materialId, switchId, keycapId] = selectedProductIds
      const payload = {
        name: keyboardName,
        options: [layoutId, materialId, switchId, keycapId],
        colors: {
          outerColor,
          keycap: {
            basicColor,
            ...(pointOption === 'custom' && Object.keys(customKeyMap).length > 0
              ? { pointColors: customKeyMap }
              : pointOption === 'set'
              ? { pointColors: {} }
              : {}),
          },
        },
        bareboneId: selectedProductIds[0],
        switchId: selectedProductIds[1],
        keycapId: selectedProductIds[2],
        totalPrice,
        thumbnailId: imageRes.imageId,
        modelId: modelRes.imageId,
      }

      console.log('[키보드 등록 요청 payload]', payload)

      const createRes = await createKeyboard(payload)
      console.log('[키보드 등록 응답]', createRes)
      toast.success('서랍장에 저장 완료!')
    } catch (err) {
      console.error('[저장 중 오류 발생]', err)
      toast.error('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex justify-end gap-4 mt-2 mb-4">
      <button
        onClick={handleSaveOnly}
        className="w-72 h-10 bg-tadak-primary text-white rounded font-semibold ml-2 mr-2 hover:bg-tadak-light-primary hover:text-tadak-primary"
      >
        서랍장에만 저장하기
      </button>
      <button className="w-72 h-10 bg-tadak-secondary text-white rounded font-semibold hover:bg-tadak-light-secondary hover:text-tadak-secondary">
        장바구니 담기
      </button>
    </div>
  )
}

export default FinalActions