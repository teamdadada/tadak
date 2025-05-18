import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { z } from 'zod'

interface NicknameModalProps {
  isOpen: boolean
  onClose: () => void
  currentNickname: string
  onSubmit: (nickname: string) => Promise<void>
}

// 닉네임 유효성 검사를 위한 Zod 스키마
const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요.')
  .max(10, '닉네임은 10자 이하여야 합니다.')
  .regex(/^[가-힣]+$/, '닉네임은 한글만 입력 가능합니다.')

const NicknameModal = ({
  isOpen,
  onClose,
  currentNickname,
  onSubmit,
}: NicknameModalProps) => {
  const [nickname, setNickname] = useState(currentNickname)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 모달이 열릴 때마다 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setNickname(currentNickname)
      setError(null)
    }
  }, [isOpen, currentNickname])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  // 입력값 변경 시 유효성 검사
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNickname(value)

    // 입력값이 있을 때만 유효성 검사 실행
    if (value) {
      try {
        nicknameSchema.parse(value)
        setError(null)
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors[0].message)
        }
      }
    } else {
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    try {
      nicknameSchema.parse(nickname)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
        return
      }
    }

    // 현재 닉네임과 동일한 경우
    if (nickname === currentNickname) {
      onClose()
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(nickname.trim())
      onClose()
    } catch (error) {
      console.error('닉네임 업데이트 실패:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled =
    isSubmitting || !nickname.trim() || nickname === currentNickname || !!error

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>닉네임 변경</DialogTitle>
          <DialogDescription>
            사용하실 새 닉네임을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="새 닉네임을 입력하세요"
              className={`px-4 py-5 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              maxLength={10}
              disabled={isSubmitting}
              autoFocus
            />
            {error ? (
              <p className="text-xs text-red-500 ml-2">{error}</p>
            ) : (
              <p className="text-xs text-tadak-dark-gray ml-2">
                최대 10자까지 입력 가능합니다.
              </p>
            )}
          </div>

          <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="bg-tadak-secondary hover:bg-tadak-secondary/90 disabled:bg-tadak-dark-gray"
            >
              {isSubmitting ? '변경 중...' : '변경하기'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NicknameModal
