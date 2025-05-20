import { useEffect } from 'react'
import { Button } from '../ui/button'
import { kbtiDescriptions } from '@/types/kbti'

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
        description: '나만의 키보드 성향을 확인해보세요!',
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
    <Button
      size="lg"
      onClick={handleShare}
      className="bg-[#FEE500] rounded-lg text-tadak-black hover:bg-[#FEE500] hover:text-tadak-black"
    >
      카카오톡 공유하기
    </Button>
  )
}

export default KakaoShareButton
