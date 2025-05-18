import FormField from '@/components/mypage/FormField'
import { Button } from '@/components/ui/button'
import { useUpdatePassword } from '@/hooks/useUser'
import { useUserStore } from '@/store/userStore'
import { useState, FormEvent } from 'react'
import { z } from 'zod'

const getLoginTypeDisplay = (type: string | undefined) => {
  switch (type) {
    case 'KAKAO':
      return '카카오'
    case 'NAVER':
      return '네이버'
    default:
      return '타닥 서비스'
  }
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '기존 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .min(1, '새 비밀번호를 입력해주세요.')
      .max(50, '비밀번호는 50자 이하여야 합니다.'),
    confirmPassword: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요.')
      .max(50, '비밀번호는 50자 이하여야 합니다.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

const UserProfile = () => {
  const getUserId = useUserStore((s) => s.getUserId)
  const getLoginType = useUserStore((s) => s.getLoginType)

  const userId = getUserId()
  const loginType = getLoginTypeDisplay(getLoginType())

  const updatePassword = useUpdatePassword()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    try {
      updatePasswordSchema.parse({
        currentPassword,
        newPassword,
        confirmPassword,
      })
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }

        error.errors.forEach((err) => {
          const path = err.path[0] as keyof typeof newErrors
          if (path) {
            newErrors[path] = err.message
          }
        })

        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)
      await updatePassword({
        new: newPassword,
        old: currentPassword,
      })

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      // 에러처리
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 mb-7">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">로그인 정보</h2>
        <hr className="border-tadak-black " />
        <div className="flex flex-col px-8 py-5">
          <FormField
            label={'아이디'}
            name={'userId'}
            type={'text'}
            value={userId}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">비밀번호 변경</h2>
        <hr className="border-tadak-black " />
        {loginType === '타닥 서비스' ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6 p-8 lg:pr-0">
              <FormField
                label={'기존 비밀번호'}
                name={'currentPassword'}
                type={'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
              />
              <FormField
                label={'새 비밀번호'}
                name={'newPassword'}
                type={'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
              />
              <FormField
                label={'새 비밀번호 확인'}
                name={'confirmPassword'}
                type={'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
            </div>
            <div className="flex justify-end mr-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-tadak-primary hover:bg-tadak-primary/90"
              >
                {isSubmitting ? '변경 중...' : '비밀번호 변경'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 p-6 m-2 border-tadak-light-gray border bg-tadak-white">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    loginType === '카카오'
                      ? '#FEE500'
                      : loginType === '네이버'
                        ? '#03C75A'
                        : '#F2F2F2',
                }}
              >
                {loginType === '카카오' && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4C6.92 4 2.81 7.16 2.81 11.03C2.81 13.45 4.25 15.59 6.5 16.88L5.58 20.11C5.51 20.31 5.73 20.48 5.91 20.37L9.82 17.88C10.53 17.98 11.26 18.03 12 18.03C16.97 18.03 21.19 14.87 21.19 11C21.19 7.13 17.08 4 12 4Z"
                      fill="#191919"
                    />
                  </svg>
                )}
                {loginType === '네이버' && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9 12.612L9.1 4H4V20H9.1V11.388L14.9 20H20V4H14.9V12.612Z"
                      fill="white"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-medium text-base">
                  {loginType} 계정으로 연결됨
                </h3>
                <p className="text-sm text-gray-500">
                  소셜 로그인 계정은 비밀번호를 변경할 수 없습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
