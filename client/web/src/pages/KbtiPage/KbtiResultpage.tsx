import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import KakaoShareButton from '@/components/kbti/KakaoShareButton'
import { Button } from '@/components/ui/button'
import { kbtiDescriptions } from '@/types/kbti'
import LoadingAnimation from '@/components/kbti/Loading'
import GradientButton from '@/components/kbti/GradientButton'

const KbtiResultPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const result = searchParams.get('type')

  const [isLoading, setIsLoading] = useState(true)

  const kbti = kbtiDescriptions[result as keyof typeof kbtiDescriptions] || {}

  // 이미지 미리 로딩
  useEffect(() => {
    if (kbti.image) {
      const img = new Image()
      img.src = kbti.image
    }
  }, [kbti.image])

  // 로딩 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">잘못된 접근입니다.</h1>
        <Button variant="default" size="lg" onClick={() => navigate('/kbti')}>
          KBTI 다시 시작하기
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[80vh]">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full gap-2 p-4 max-h-screen"
          >
            {kbti.image && (
              <motion.img
                src={kbti.image}
                alt={kbti.nickname}
                className="w-3/4 mb-4 rounded-lg border-4 border-[#462917]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            <motion.ul
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {kbti.expressions?.map((expression, index) => (
                <motion.li
                  key={index}
                  className="text-center text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {expression}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-col items-center justify-center gap-2 mt-4 w-48"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <KakaoShareButton kbtiType={result} />
              <GradientButton
                onClick={() => navigate('/kbti')}
                className="w-full h-12"
              >
                <div className="flex justify-between gap-1 items-center">
                  {/* 새로고침/다시하기 아이콘 */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm font-bold">다시 검사하기</span>
                </div>
              </GradientButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KbtiResultPage
