import { useUserStore } from '@/store/userStore'
import { MenuType } from './MyPage'
import {
  Heart,
  ShoppingCart,
  User,
  CreditCard,
  FileEdit,
  UserCircle,
  PencilIcon,
  Loader2,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useUpdateNickname, useUpdateProfileImg } from '@/hooks/useUser'
import { UpdateProfileImgRequest } from '@/types/user'
import NicknameModal from '@/components/mypage/NicknameModal'

interface MobileMenuBarProps {
  selectedMenu: MenuType
  onMenuChange: (menu: MenuType) => void
}

const MobileMenuBar = ({ selectedMenu, onMenuChange }: MobileMenuBarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isUpdatingImg, setIsUpdatingImg] = useState(false)
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false)

  const mainMenuItems: MenuType[] = [
    '찜',
    '장바구니',
    '회원 정보',
    '결제 내역',
    '작성한 리뷰',
  ]

  const renderIcon = (item: MenuType) => {
    const iconProps = {
      className: `${selectedMenu === item ? 'text-tadak-black' : 'text-tadak-dark-gray'}`,
      size: 20,
    }

    switch (item) {
      case '찜':
        return <Heart {...iconProps} />
      case '장바구니':
        return <ShoppingCart {...iconProps} />
      case '회원 정보':
        return <User {...iconProps} />
      case '결제 내역':
        return <CreditCard {...iconProps} />
      case '작성한 리뷰':
        return <FileEdit {...iconProps} />
      default:
        return null
    }
  }

  const menuBadges: Partial<Record<MenuType, number>> = {
    찜: 3,
    장바구니: 4,
  }

  const getUserProfileImage = useUserStore((s) => s.getProfileImage)
  const getUserName = useUserStore((s) => s.getUserName)
  const updateProfileImg = useUpdateProfileImg()
  const updateNickname = useUpdateNickname()

  const userProfileImage = getUserProfileImage()
  const userName = getUserName() || '익명'

  // 프로필 이미지 변경
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUpdatingImg(true)

      const updateData: UpdateProfileImgRequest = {
        file: file,
      }

      await updateProfileImg(updateData)
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error)
    } finally {
      setIsUpdatingImg(false)
    }
  }

  // 닉네임 변경
  const handleNicknameClick = () => {
    setIsNicknameModalOpen(true)
  }

  const handleNicknameSubmit = async (newNickname: string) => {
    await updateNickname({ nickname: newNickname })
  }

  return (
    <div className="bg-white shadow-sm">
      {/* 프로필 정보 */}
      <div className="py-4 px-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          {/* 프로필 이미지 */}
          <div className="relative">
            {userProfileImage ? (
              <div
                className="relative w-12 h-12 rounded-full cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={userProfileImage}
                  alt="프로필 이미지"
                  className={`w-12 h-12 rounded-full object-cover border border-tadak-light-gray ${isUpdatingImg ? 'opacity-70' : ''}`}
                />
                {isUpdatingImg && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                    <Loader2 className="h-6 w-6 text-tadak-black animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-tadak-light-gray text-tadak-gray cursor-pointer"
                onClick={handleImageClick}
              >
                <UserCircle size={28} />
              </div>
            )}

            {/* 편집 아이콘 */}
            <div
              className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm cursor-pointer"
              onClick={handleImageClick}
            >
              <PencilIcon size={12} className="text-tadak-gray" />
            </div>

            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUpdatingImg}
            />
          </div>

          {/* 닉네임 */}
          <div
            className="flex cursor-pointer ml-2"
            onClick={handleNicknameClick}
          >
            <p className="text-xl font-bold truncate">{userName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 border-b">
        {mainMenuItems.map((item) => (
          <button
            key={item}
            onClick={() => onMenuChange(item)}
            className={`flex flex-col items-center justify-center py-4 relative ${
              selectedMenu === item
                ? 'text-tadak-black font-medium border-b-2 border-tadak-black'
                : 'text-tadak-dark-gray'
            }`}
          >
            <div className="mb-1 relative">
              {renderIcon(item)}

              {/* 배지 */}
              {menuBadges[item] && (
                <span className="absolute -top-2 -right-2 bg-tadak-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {menuBadges[item]}
                </span>
              )}
            </div>
            <span className="text-xs whitespace-nowrap">{item}</span>
          </button>
        ))}
      </div>

      {/* 닉네임 변경 모달 */}
      <NicknameModal
        isOpen={isNicknameModalOpen}
        onClose={() => setIsNicknameModalOpen(false)}
        currentNickname={userName}
        onSubmit={handleNicknameSubmit}
      />
    </div>
  )
}

export default MobileMenuBar
