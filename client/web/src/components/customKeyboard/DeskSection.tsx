import { useRef, useState, useEffect } from 'react'
import DeskCanvas, { DeskCanvasHandle } from './DeskCanvas'
import ActionButtons from './ActionButtons'
import { useDefaultPlacement } from '@/hooks/usePlacement'
import { useDeskStore } from '@/store/deskStore'
import { updatePlacement } from '@/services/placementService'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

const DeskSection = () => {
  const [isDirty, setIsDirty] = useState(false)
  const canvasRef = useRef<DeskCanvasHandle>(null)

  const { data: placement, isLoading } = useDefaultPlacement()
  const {
    model3dUrl,
    setModel3dUrl,
    selectedKeyboardId,
    setSelectedKeyboardId,
    setDefaultTransform,
    setDeskImageUrl,
    setDeskImageId,
    deskImageUrl,
    deskImageId,
  } = useDeskStore()

  const queryClient = useQueryClient()
  
  // model3dUrl 혹은 데스크 이미지 변경될 때 저장 버튼을 표시
  useEffect(() => {
    if (!placement) return
  
    // 3D 모델 변경됐을 때
    if (model3dUrl) {
      setIsDirty(true)
      return
    }
  
    // 데스크 이미지가 변경됐을 때
    if (deskImageUrl && deskImageUrl !== placement.imageUrl) {
      setIsDirty(true)
      return
    }
  
    // 초기 상태 유지
    setIsDirty(false)
  }, [model3dUrl, deskImageUrl, placement])

  // placement 초기 transform store에 저장
  useEffect(() => {
    if (placement) {
      setDefaultTransform({
        // position: placement.position,
        // rotation: placement.rotation,
        // scale: placement.scale,
        position: { x: 0, y: -1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0.5, y: 0.5, z: 0.5 },
      })
    }
  }, [placement, setDefaultTransform])

  const handleSave = async () => {
    const model = canvasRef.current?.object
    if (!model || !placement) {
      toast.error('저장할 정보가 부족해요.')
      return
    }

    const body = {
      placementId: deskImageId ?? placement.placementId,
      keyboardId: selectedKeyboardId ?? placement.keyboardId, // 상태에서 가져온 키보드 ID
      imageId: placement.imageId,
      position: {
        x: Number(model.position.x),
        y: Number(model.position.y),
      },
      rotation: {
        x: Number(model.rotation.x),
        y: Number(model.rotation.y),
        z: Number(model.rotation.z),
      },
      scale: {
        x: Number(model.scale.x),
        y: Number(model.scale.y),
        z: Number(model.scale.z),
      },
    }

    try {
      await updatePlacement(body)
      toast.success('데스크 이미지가 저장되었어요!')
      setIsDirty(false)
      setModel3dUrl(null) // 상태 초기화
      setSelectedKeyboardId(null)
      setDefaultTransform(null)
      setDeskImageUrl(null)
      setDeskImageId(null)
      canvasRef.current?.resetControls() // EditorToolbar 초기화
      await queryClient.invalidateQueries({ queryKey: ['defaultPlacement'] })
    } catch (error) {
      console.error(error)
      toast.error('저장 중 오류가 발생했어요.')
    }
  }

  const handleCancel = () => {
    if (!placement) {
      toast.error('되돌릴 배치 정보가 없어요.')
      return
    }

    // 기존 transform, 모델 정보 복구
    setDefaultTransform({
      position: placement.position,
      rotation: placement.rotation,
      scale: placement.scale,
    })
    setModel3dUrl(placement.model3dUrl)
    setSelectedKeyboardId(placement.keyboardId)
    setDeskImageUrl(null)
    canvasRef.current?.resetControls()
    setIsDirty(false)
    toast.success('변경 내용을 되돌렸어요.')
  }

  return (
    <div className="flex flex-col h-[500px]">
      <h2 className="text-lg font-semibold mb-3">나의 타닥 데스크</h2>

      <div className="relative border rounded-lg bg-white flex-1 h-[400px]">
        {isLoading ? (
          <p className="text-sm text-gray-400 text-center mt-32">로딩 중...</p>
        ) : (
          <DeskCanvas
            ref={canvasRef}
            setIsDirty={setIsDirty}
            model3dUrl={placement?.model3dUrl || null}
            imageUrl={deskImageUrl || placement?.imageUrl || ''}
          />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <ActionButtons
          isDirty={isDirty}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default DeskSection