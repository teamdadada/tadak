import { useUserStore } from '@/store/userStore'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { useUpdateNickname } from '@/hooks/useUser'
import { UpdateNicknameRequest } from '@/types/user'
import { MenuType } from './MyPage'
import ProfileImage from '@/components/mypage/ProfileImage'
import SidebarMenu from '@/components/mypage/SidebarMenu'
import NicknameModal from '@/components/mypage/NicknameModal'
import { useGetZzimCount } from '@/hooks/useZzim'

interface SidebarProps {
  selectedMenu: MenuType
  onMenuChange: (menu: MenuType) => void
}

const MypageSidebar = ({ selectedMenu, onMenuChange }: SidebarProps) => {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false)

  const menuCategories = [
    {
      title: '나의 계정정보',
      items: ['회원 정보'] as MenuType[],
    },
    {
      title: '나의 쇼핑정보',
      items: ['결제 내역', '작성한 리뷰'] as MenuType[],
    },
  ]

  const getUserProfileImage = useUserStore((s) => s.getProfileImage)
  const getUserName = useUserStore((s) => s.getUserName)
  const updateNickname = useUpdateNickname()

  const { data } = useGetZzimCount()

  const userProfileImage = getUserProfileImage()
  const userName = getUserName() || '익명'

  const handleNicknameEditClick = () => {
    setIsNicknameModalOpen(true)
  }

  const handleNicknameSubmit = async (newNickname: string) => {
    const updateData: UpdateNicknameRequest = {
      nickname: newNickname,
    }

    await updateNickname(updateData)
  }

  return (
    <div className="w-full md:w-48 lg:w-64 p-6 mt-10">
      {/* 프로필 */}
      <div className="flex flex-col gap-4 mb-4">
        {/* 프로필 사진 */}
        <ProfileImage imageUrl={userProfileImage} />

        {/* 닉네임 */}
        <div className="px-1">
          <div className="flex justify-between items-end ">
            <p className="text-3xl font-extrabold">{userName}</p>
            <button
              onClick={handleNicknameEditClick}
              className="p-0 rounded-full"
              aria-label="닉네임 수정"
            >
              <PencilIcon size={14} className="text-tadak-gray" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-6 font-semibold text-[15px]">
        <button
          onClick={() => onMenuChange('찜')}
          className={`flex justify-between items-center p-2 rounded ${
            selectedMenu === '찜' ? 'font-bold ' : 'bg-white hover:underline'
          }`}
        >
          찜 {data?.cnt !== undefined ? data.cnt : ''}
        </button>

        <button
          onClick={() => onMenuChange('장바구니')}
          className={`flex justify-between items-center p-2 rounded ${
            selectedMenu === '장바구니'
              ? 'font-bold '
              : 'bg-white hover:underline'
          }`}
        >
          장바구니
        </button>
      </div>

      {/* 메뉴 목록 */}
      <SidebarMenu
        selectedMenu={selectedMenu}
        onMenuChange={onMenuChange}
        categories={menuCategories}
      />

      {/* 닉네임 수정 모달 */}
      <NicknameModal
        isOpen={isNicknameModalOpen}
        onClose={() => setIsNicknameModalOpen(false)}
        currentNickname={userName}
        onSubmit={handleNicknameSubmit}
      />
    </div>
  )
}

export default MypageSidebar
