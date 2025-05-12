import FormField from '@/components/mypage/FormField'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

const UserProfile = () => {
  const userId = 'ebeleey'
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
        <form action="">
          <div className="flex flex-col space-y-6 p-8 lg:pr-0">
            <FormField
              label={'기존 비밀번호'}
              name={'currentPassword'}
              type={'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <FormField
              label={'새 비밀번호'}
              name={'newPassword'}
              type={'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helpText="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
            />
            <FormField
              label={'새 비밀번호 확인'}
              name={'confirmPassword'}
              type={'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end mr-4">
            <Button type="submit">비밀번호 변경</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
