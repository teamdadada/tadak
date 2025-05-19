import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import heart from '@/assets/images/heart.png'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/navigation'

import Tabs from '@/components/ui/Tabs'
import ItemCard from '@/components/shop/ItemCard'
import { fetchItems } from '@/services/mainService'
import { Product } from '@/types/shop'
import Chatbot from '@/components/chatbot/Chatbot'
// import { getPopularItems, MockItem } from '@/mocks/mockPopularItems'
// import { getNewItems } from '@/mocks/mockNewItems'
// import ThanksImage from '@/assets/images/thanks.png'
import Main1 from '@/assets/images/main1.png'
import Main2 from '@/assets/images/main2.png'
import Main3 from '@/assets/images/main3.png'
import Main4 from '@/assets/images/main4.png'

const bannerSlides = [
  // {
  //   text: '스승의 날',
  //   subText: '컨설턴트님 감사합니다!!  - A703 일동-',
  //   route: null,
  //   bgColor: '#FFE0E0', // 연한 빨강
  //   imageUrl: ThanksImage,
  // },
  {
    text: '타닥으로 시작하는 나만의 키보드 여정',
    subText: '처음이라도 괜찮아요. 타닥이 용어부터 조립까지 함께할게요.',
    route: null,
    bgColor: '#FFEED1', // 연한 오렌지
    imageUrl: Main1,
  },
  {
    text: '원하는 소리, 직접 들어보세요!',
    subText: '다양한 키보드 사운드를 체험하며 나만의 소리를 찾아보세요!',
    route: '/soundtest',
    bgColor: '#E9F5FF', // 연한 하늘색
    imageUrl: Main2,
  },
  {
    text: '디자인하고, 책상 위에 배치해보세요!',
    subText:
      '원하는 스타일로 키보드를 커스텀하고, 실제 책상 위에 배치해보세요.',
    route: '/customkeyboard',
    bgColor: '#E6E1F5', // 연한 보라색
    imageUrl: Main3,
  },
  {
    text: '당신의 키보드 성향은? KBTI로 확인해보세요!',
    subText:
      '간단한 테스트로 내 취향을 분석하고 딱 맞는 키보드를 추천받아보세요!',
    route: '/kbti',
    bgColor: '#FFF9DE', // 연한 노란색
    imageUrl: Main4,
  },
]

const tabToCategory = ['BAREBONE', 'SWITCH', 'KEYCAP'] as const

const MainPage = () => {
  const [activePopularTab, setActivePopularTab] = useState(1)
  const [activeNewTab, setActiveNewTab] = useState(1)
  // const [popularItems, setPopularItems] = useState<MockItem[]>([])
  // const [newItems, setNewItems] = useState<MockItem[]>([])
  const [showHearts, setShowHearts] = useState(false)
  const navigate = useNavigate()

  const {
    data: popularItems = [],
    isLoading: isPopularLoading,
    error: popularError,
  } = useQuery<Product[]>({
    queryKey: ['popularItems', activePopularTab],
    queryFn: () =>
      fetchItems({
        type: tabToCategory[activePopularTab],
        sort: 'POPULAR',
        size: 4,
      }),
  })

  const {
    data: newItems = [],
    isLoading: isNewLoading,
    error: newError,
  } = useQuery<Product[]>({
    queryKey: ['newItems', activeNewTab],
    queryFn: () =>
      fetchItems({
        type: tabToCategory[activeNewTab],
        sort: 'LATEST',
        size: 4,
      }),
  })

  // // 탭 인덱스에 따른 카테고리 필터
  // const tabToCategory = ['베어본', '스위치', '키캡']

  // // 목업 데이터
  // useEffect(() => {
  //   const category = tabToCategory[activePopularTab]
  //   const data = getPopularItems(category, { page: 1, size: 4 })
  //   setPopularItems(data)
  // }, [activePopularTab])

  // useEffect(() => {
  //   const category = tabToCategory[activeNewTab]
  //   const data = getNewItems(category, { page: 1, size: 4 })
  //   setNewItems(data)
  // }, [activeNewTab])

  return (
    <div className="flex flex-col items-center w-full">
      {/* 하트 애니메이션 */}
      {showHearts &&
        Array.from({ length: 10 }, (_, i) => {
          const isLeftSide = Math.random() < 0.5
          const left = isLeftSide
            ? `${5 + Math.random() * 20}%`
            : `${75 + Math.random() * 20}%`

          const delay = Math.random() * 0.1
          const duration = 3 + Math.random() * 2
          const rotate = Math.random() * 30 - 15
          const size = 48 + Math.random() * 24

          return (
            <motion.img
              key={i}
              src={heart}
              alt="heart"
              className="pointer-events-none fixed z-50"
              initial={{ y: '100vh', opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                y: ['100vh', '-30vh'],
                scale: [1, 1.3, 1],
                rotate: [0, rotate, -rotate, 0],
                opacity: [1, 0.8, 0.4, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              style={{
                left,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          )
        })}

      {/* 배너 캐러셀 */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000, // 2초마다 자동 전환
          disableOnInteraction: false, // 유저 조작 후에도 자동 재생 유지
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        className="w-full h-[360px] mb-16 rounded-md overflow-hidden bg-white"
      >
        {bannerSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              onClick={() => {
                // if (idx === 0) {
                //   setShowHearts(true)
                //   setTimeout(() => setShowHearts(false), 3000)
                // }
                slide.route && navigate(slide.route)
              }}
              style={{ backgroundColor: slide.bgColor }}
              className="flex flex-col min-[1060px]:flex-row justify-between items-center h-full cursor-pointer px-2 min-[1060px]:px-20 min-[1200px]:px-40"
            >
              <div className="flex-1">
                <h2 className="text-lg min-w-90 min-[1060px]:text-xl min-[1200px]:text-2xl font-bold text-tadak-black mb-3 mt-12 min-[1060px]:mt-0">
                  {slide.text}
                </h2>
                <p className="text-gray-500 text-sm min-[1060px]:sm min-[1200px]:text-base mb-1 min-[1060px]:mb-40">
                  {slide.subText}
                </p>
              </div>
              <div className="flex items-center justify-end flex-1">
                {slide.imageUrl ? (
                  <img
                    src={slide.imageUrl}
                    alt="배너 이미지"
                    className="mb-6 w-80 h-72 object-contain rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center mb-6 rounded-md min-w-96 min-h-52 text-tadak-gray">
                    이미지 자리
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper 커스텀 스타일 */}
      <style>{`
        .swiper-pagination {
          margin-bottom: 16px;
        }
        .swiper-pagination-bullet {
          background-color: #e5e7eb;
          width: 8px;
          height: 8px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active-custom {
          background-color: #fb923c !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #909090;
          width: 40px;
          height: 40px;
          margin: 0 20px;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px;
          font-weight: semibold;
        }
      `}</style>

      {/* 지금 인기 있는 타닥템 */}
      <section className="w-full max-w-[1100px] px-4 mb-20">
        <div className="flex items-end justify-between mb-3">
          <div className="text-xl font-bold text-tadak-black">
            🔥지금 인기 있는 타닥템
          </div>
          <button className="font-medium text-orange-400 text-medium hover:underline">
            + 더보기
          </button>
        </div>
        <p className="pl-2 mb-4 font-semibold text-medium text-tadak-dark-gray">
          타닥 유저들이 선택한 인기 상품들을 확인해보세요!
        </p>
        <Tabs
          items={['베어본', '스위치', '키캡']}
          selectedIndex={activePopularTab}
          onChange={setActivePopularTab}
          width={'100%'}
          tabWidth={100}
          indicatorWidth={100}
        />
        <div className="relative min-h-[330px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {isPopularLoading ? (
              <div className="mt-12 text-center text-gray-500 col-span-full">
                로딩 중...
              </div>
            ) : popularError ? (
              <div className="mt-12 text-center text-red-500 col-span-full">
                지금은 불러올 수 없습니다.(오류 발생)
              </div>
            ) : (
              popularItems.map((item) => (
                <ItemCard key={item.productId} {...item} size="md" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 따끈따끈, 새로 들어온 타닥템 */}
      <section className="w-full max-w-[1100px] px-4 mb-24">
        <div className="flex items-end justify-between mb-3">
          <div className="text-xl font-bold text-tadak-black">
            ✨따끈따끈, 새로 들어온 타닥템
          </div>
          <button className="font-medium text-orange-400 text-medium hover:underline">
            + 더보기
          </button>
        </div>
        <p className="pl-2 mb-4 font-semibold text-medium text-tadak-dark-gray">
          방금 도착한 신상, 타닥에 갓 등록된 상품들을 지금 구경해보세요!
        </p>
        <Tabs
          items={['베어본', '스위치', '키캡']}
          selectedIndex={activeNewTab}
          onChange={setActiveNewTab}
          width={'100%'}
          tabWidth={100}
          indicatorWidth={100}
        />
        <div className="relative min-h-[330px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
            {isNewLoading ? (
              <div className="mt-12 text-center text-gray-500 col-span-full">
                로딩 중...
              </div>
            ) : newError ? (
              <div className="mt-12 text-center text-red-500 col-span-full">
                지금은 불러올 수 없습니다.(오류 발생)
              </div>
            ) : (
              newItems.map((item) => (
                <ItemCard key={item.productId} {...item} size="md" />
              ))
            )}
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  )
}

export default MainPage
