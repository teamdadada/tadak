import { Loader2, PencilIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useUpdateProfileImg } from '@/hooks/useUser'
import { UpdateProfileImgRequest } from '@/types/user'

interface ProfileImageProps {
  imageUrl: string | undefined
}

const ProfileImage = ({ imageUrl }: ProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProfileImg = useUpdateProfileImg()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUpdating(true)

      const updateData: UpdateProfileImgRequest = {
        file: file,
      }

      await updateProfileImg(updateData)
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl || '/default-profile.jpg'}
        alt="프로필 이미지"
        className={`p-2  md:w-48 md:h-48 lg:w-64 lg:h-48 object-cover  ${isUpdating ? 'opacity-50' : ''}`}
      />
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 ">
          <Loader2 className="h-8 w-8 text-tadak-blue animate-spin" />
        </div>
      )}
      <div
        onClick={handleImageClick}
        className={`absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md 
          transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} ${isUpdating ? 'pointer-events-none opacity-0' : ''}`}
      >
        <PencilIcon size={16} className="text-tadak-dark-gray" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUpdating}
      />
    </div>
  )
}

export default ProfileImage
