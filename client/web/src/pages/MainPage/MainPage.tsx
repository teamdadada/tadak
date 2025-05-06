import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/navigation'

import Tabs from '@/components/ui/Tabs'
import ItemCard from '@/components/shop/ItemCard'
import { getPopularItems } from '@/mocks/mockPopularItems'
import { getNewItems } from '@/mocks/mockNewItems'

const bannerSlides = [
  {
    text: '타닥으로 시작하는 나만의 키보드 여정',
    subText: '처음이라도 괜찮아요. 타닥이 용어부터 조립까지 함께할게요.',
    route: null,
    bgColor: '#FFF3E0', // 연한 오렌지
  },
  {
    text: '원하는 소리, 직접 들어보세요!',
    subText: '다양한 키보드 사운드를 체험하며 나만의 소리를 찾아보세요!',
    route: '/soundtest',
    bgColor: '#E9F5FF', // 연한 하늘색
  },
  {
    text: '디자인하고, 책상 위에 배치해보세요!',
    subText:
      '원하는 스타일로 키보드를 커스텀하고, 실제 책상 위에 배치해보세요.',
    route: '/customkeyboard',
    bgColor: '#F3F0FF', // 연한 보라색
  },
  {
    text: '당신의 키보드 성향은? KBTI로 확인해보세요!',
    subText:
      '간단한 테스트로 내 취향을 분석하고 딱 맞는 키보드를 추천받아보세요!',
    route: '/kbti',
    bgColor: '#FFFBE6', // 연한 노란색
  },
]

const MainPage = () => {
  const [activePopularTab, setActivePopularTab] = useState(1)
  const [activeNewTab, setActiveNewTab] = useState(1)
  const navigate = useNavigate()

  // 목업 데이터
  const popularItems = getPopularItems()
  const newItems = getNewItems()

  return (
    <div className="flex flex-col items-center w-full">
      {/* 배너 캐러셀 */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2000, // 2초마다 자동 전환
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
              onClick={() => slide.route && navigate(slide.route)}
              style={{ backgroundColor: slide.bgColor }}
              className="flex flex-col min-[1060px]:flex-row justify-between items-center h-full cursor-pointer px-2 min-[1060px]:px-20 min-[1200px]:px-40"
            >
              <div className="flex-1">
                <h2 className="text-lg min-w-90 min-[1060px]:text-xl min-[1200px]:text-2xl font-bold text-tadak-black mb-3 mt-12 min-[1060px]:mt-0">
                  {slide.text}
                </h2>
                <p className="text-gray-500 text-sm min-[1060px]:sm min-[1200px]:text-base mb-1 min-[1060px]:mb-40">{slide.subText}</p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <div className="min-w-96 min-h-52 rounded-md flex items-center justify-center text-tadak-gray mb-6">
                  이미지 자리
                </div>
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
        <div className="flex justify-between items-end mb-3">
          <div className="text-xl font-bold text-tadak-black">
            🔥지금 인기 있는 타닥템
          </div>
          <button className="text-medium text-orange-400 font-medium hover:underline">
            + 더보기
          </button>
        </div>
        <p className="text-medium text-tadak-dark-gray font-semibold mb-4 pl-2">
          타닥 유저들이 선택한 인기 상품들을 확인해보세요!
        </p>
        <Tabs
          items={['베어본', '스위치', '키캡']}
          selectedIndex={activePopularTab}
          onChange={setActivePopularTab}
          width={300}
          tabWidth={100}
          indicatorWidth={100}
        />
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-4 mt-6">
          {popularItems.map((item, i) => (
            <ItemCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* 따끈따끈, 새로 들어온 타닥템 */}
      <section className="w-full max-w-[1100px] px-4 mb-24">
        <div className="flex justify-between items-end mb-3">
          <div className="text-xl font-bold text-tadak-black">
            ✨따끈따끈, 새로 들어온 타닥템
          </div>
          <button className="text-medium text-orange-400 font-medium hover:underline">
            + 더보기
          </button>
        </div>
        <p className="text-medium text-tadak-dark-gray font-semibold mb-4 pl-2">
          방금 도착한 신상, 타닥에 갓 등록된 상품들을 지금 구경해보세요!
        </p>
        <Tabs
          items={['베어본', '스위치', '키캡']}
          selectedIndex={activeNewTab}
          onChange={setActiveNewTab}
          width={300}
          tabWidth={100}
          indicatorWidth={100}
        />
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-2 mt-6">
          {newItems.map((item, i) => (
            <ItemCard key={i} {...item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default MainPage
