import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useDeskStore } from '@/store/deskStore'

import { deletePlacement, getPlacementDetail } from '@/services/placementService'
import { deleteKeyboard, fetchKeyboardModel3D } from '@/services/keyboardService'

import DeskDeleteModal from './modals/DeskDeleteModal'
import KeyBoardDeleteModal from './modals/KeyboardDeleteModal'

import { ReactNode } from 'react'
import { ReactComponent as DeskIcon } from '@/assets/icons/desk.svg'
import { ReactComponent as CartIcon } from '@/assets/icons/cart.svg'
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '@/assets/icons/delete.svg'

interface ItemDropdownProps {
  itemId: number
  itemType: 'keyboard' | 'desk'
  imageUrl?: string
  children: ReactNode
  open: boolean
  onOpenChange: (value: boolean) => void
  onDirtyChange?: (dirty: boolean) => void
  canDelete?: boolean
}

const ItemDropdown = ({
  itemId,
  itemType,
  imageUrl,
  children,
  open,
  onOpenChange,
  onDirtyChange,
  canDelete = true,
}: ItemDropdownProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const queryClient = useQueryClient()
  const {
    setModel3dUrl,
    setSelectedKeyboardId,
    setDeskImageUrl,
    setDeskImageId,
    setDefaultTransform,
    setIsDirty,
  } = useDeskStore()

  const { mutate: mutateDeletePlacement } = useMutation({
    mutationFn: deletePlacement,
    onSuccess: () => {
      toast.success('데스크 이미지가 삭제되었어요.')
      queryClient.invalidateQueries({ queryKey: ['placementList'] }) // 리스트 새로고침
    },
    onError: () => {
      toast.error('삭제 중 오류가 발생했어요.')
    },
  })

  const { mutate: mutateDeleteKeyboard } = useMutation({
    mutationFn: deleteKeyboard,
    onSuccess: () => {
      toast.success('키보드가 삭제되었어요.')
      queryClient.invalidateQueries({ queryKey: ['keyboardList'] })
    },
    onError: () => {
      toast.error('삭제 중 오류가 발생했어요.')
    },
  })

  // 3D 모델 요청 및 처리
  const { mutate: fetchModel3D } = useMutation({
    mutationFn: fetchKeyboardModel3D,
    onSuccess: (data) => {
      toast.success('나의 타닥 데스크에 키보드 모델이 로드되었어요.')
      setModel3dUrl(data.model3dUrl)
      setSelectedKeyboardId(itemId)  // 현재 선택된 키보드 ID 저장
    },
    onError: () => {
      toast.error('3D 모델 불러오기 실패')
    },
  })

  const toggleDropdown = () => onOpenChange(!open)

  const handleAction = async (action: string) => {
    if (action === 'delete') {
      setShowConfirmModal(true)
    } else if (action === 'set' && itemType === 'desk') {
      if (!imageUrl) {
        toast.error('이미지 정보가 없어요.')
        return
      }
      try {
        const placement = await getPlacementDetail(itemId)
        setDeskImageUrl(placement.imageUrl)
        setDeskImageId(placement.placementId)

        setDefaultTransform({
          position: placement.position,
          rotation: placement.rotation,
          scale: placement.scale,
        })

        onDirtyChange?.(true)
        setIsDirty(true)
        toast.success('나의 타닥 데스크 배경으로 설정했어요.')
      } catch (error) {
        toast.error('배치 정보를 불러오는 데 실패했어요.')
      }
    } else if (itemType === 'keyboard' && action === 'place') {
      fetchModel3D(itemId)
    } else if (itemType === 'keyboard' && (action === 'cart' || action === 'edit')) {
      toast.info('해당 기능은 곧 오픈될 예정이에요 🙌')
    } else {
      console.log(`Action "${action}" on item #${itemId}`)
    }
    onOpenChange(false)
  }

  const handleDeleteConfirm = () => {
    if (itemType === 'desk') {
      mutateDeletePlacement(itemId)
    } else {
      mutateDeleteKeyboard(itemId)
    }
    setShowConfirmModal(false)
  }

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div className="absolute z-50 mt-2 right-[-9px] w-[181px] rounded-md bg-white shadow border p-2 space-y-2">
          {itemType === 'keyboard' ? (
            <>
              <DropdownItem icon={<DeskIcon />} text="내 데스크에 배치" onClick={() => handleAction('place')} />
              <DropdownItem icon={<CartIcon />} text="장바구니 담기" onClick={() => handleAction('cart')} />
              <DropdownItem icon={<EditIcon />} text="수정" onClick={() => handleAction('edit')} />
              <DropdownItem icon={<DeleteIcon />} text="삭제" onClick={() => handleAction('delete')} />
            </>
          ) : (
            <>
              <DropdownItem icon={<DeskIcon />} text="내 데스크에 설정" onClick={() => handleAction('set')} />
              {canDelete && (
                <DropdownItem icon={<DeleteIcon />} text="삭제" onClick={() => handleAction('delete')} />
              )}
            </>
          )}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        itemType === 'keyboard' ? (
          <KeyBoardDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={() => setShowConfirmModal(false)}
          />
        ) : (
          <DeskDeleteModal
            onConfirm={handleDeleteConfirm}
            onCancel={() => setShowConfirmModal(false)}
          />
        )
      )}
    </div>
  )
}

interface DropdownItemProps {
  icon: ReactNode
  text: string
  onClick: () => void
}

const DropdownItem = ({ icon, text, onClick }: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-tadak-dark-gray rounded-md border border-gray-200 hover:bg-gray-100"
    >
      <span className="w-4 h-4">{icon}</span>
      {text}
    </button>
  )
}

export default ItemDropdown