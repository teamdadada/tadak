import { useEffect } from 'react'
import { kbtiDescriptions } from '@/types/kbti'
import GradientButton from './GradientButton'

const { Kakao } = window

const KakaoShareButton = ({ kbtiType }: { kbtiType: string }) => {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
      console.log(Kakao.isInitialized())
    }
  }, [])

  const handleShare = () => {
    const shareUrl = `${import.meta.env.VITE_SHARE_URL}/kbti/result?type=${kbtiType}`
    const imageUrl =
      kbtiDescriptions[kbtiType as keyof typeof kbtiDescriptions]?.shareImage ??
      `${import.meta.env.VITE_SHARE_URL}/tadak.png`

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 KBTI 결과는 ${kbtiType}!`,
        description: 'KBTI가 무엇인지 궁금하다면? \n결과를 확인해보세요!',
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },

      buttons: [
        {
          title: '결과 보기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        {
          title: '테스트 해보기',
          link: {
            mobileWebUrl: `${import.meta.env.VITE_SHARE_URL}/kbti`,
            webUrl: `${import.meta.env.VITE_SHARE_URL}/kbti`,
          },
        },
      ],
    })
  }

  return (
    <GradientButton onClick={handleShare} className="h-12 w-full">
      <div className="flex flex-row justify-center items-center gap-2">
        {/* 카카오톡 로고 아이콘 */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C6.477 3 2 6.477 2 10.8C2 13.654 3.858 16.112 6.5 17.424V21L10.25 18.475C10.821 18.557 11.404 18.6 12 18.6C17.523 18.6 22 15.123 22 10.8C22 6.477 17.523 3 12 3Z"
            fill="#3A1D1D"
          />
        </svg>

        <span className="text-sm font-bold">카카오톡 공유하기</span>
      </div>
    </GradientButton>
  )
}

export default KakaoShareButton
