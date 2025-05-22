import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/navigation'

// 이미지 import
import slide1 from '@/assets/images/slide1.png'
import slide2 from '@/assets/images/slide2.png'
import slide3 from '@/assets/images/slide3.png'
import slide4 from '@/assets/images/slide4.png'
import slide5 from '@/assets/images/slide5.png'


const OnboardingPage = () => {
    const navigate = useNavigate()
    const [_ /* activeIndex */, setActiveIndex] = useState(0)

    const slides = [
        {
            title: '나만의 키보드, 어렵지 않아요!',
            description: [
                '타닥은 커스텀 키보드 초보자를 위한 큐레이션 플랫폼입니다.',
                '챗봇과 함께라면, 어려운 용어도 문제없어요!'
            ],
            image: slide1
        },
        {
            title: '소리로 직접 느껴보세요!',
            description: [
                '온라인에서도 실제처럼 타건 소리를 비교해보세요.',
                "키보드를 누르면 '도각도각' 소리가 바로 들려요!"
            ],
            image: slide2
        },
        {
            title: '나만의 키보드를 꾸며보세요',
            description: ['베어본, 스위치, 키캡까지', '원하는 스타일로 자유롭게 커스텀해보세요.'],
            image: slide3
        },
        {
            title: '당신의 책상 위에 배치해보세요',
            description: ['\"내 책상과 어울릴까?\" 고민이라면?', '실제 데스크 사진 위에 나만의 키보드를 배치해보세요.'],
            image: slide4
        },
        {
            title: '재미있는 성향 테스트도 준비했어요',
            description: ['나의 키보드 성향은? KBTI 테스트로 알아보세요!', '결과에 맞춰 제품도 추천해드려요.'],
            image: slide5,
            buttons: [
                { text: '홈으로 이동하기', onClick: () => navigate('/main') },
                { text: 'KBTI 테스트 해보기', onClick: () => navigate('/kbti') }
            ]
        }
    ]

    return (
        <div className="relative w-full max-w-screen-xl mx-auto p-8">
            {/* 건너뛰기 버튼 */}
            <button
                onClick={() => navigate('/main')}
                className="absolute top-16 right-16 text-sm text-gray-500 hover:underline z-10"
            >
                건너뛰기
            </button>

            <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true, bulletActiveClass: 'swiper-pagination-bullet-active-custom' }}
                navigation
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                spaceBetween={30}
                slidesPerView={1}
                className="bg-white rounded-xl mt-2 h-[560px]"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-full mt-24 px-40">
                            {/* 텍스트 영역 */}
                            <div className="flex-1 flex flex-col justify-between h-full text-center md:text-left">
                                <div>
                                    <h2 className="text-3xl text-tadak-black font-bold mb-6">{slide.title}</h2>
                                    {slide.description.map((line, i) => (
                                        <p key={i} className="text-gray-500 mb-2">{line}</p>
                                    ))}
                                </div>

                                {/* 버튼 영역 - 항상 아래에 위치 */}
                                <div className="mb-60 flex gap-8 justify-center md:justify-start min-h-[52px]">
                                    {slide.buttons?.map((btn, i) => (
                                        <button
                                            key={i}
                                            onClick={btn.onClick}
                                            className={`w-52 py-2 rounded-full text-sm font-medium border ${i === 0
                                                ? 'bg-tadak-primary border-tadak-primary text-white hover:bg-orange-400'
                                                : 'border-tadak-primary text-tadak-primary hover:bg-orange-50'
                                                } transition`}
                                        >
                                            {btn.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 이미지 영역 */}
                            <div className="flex-1">
                                <img src={slide.image} alt={slide.title} className="max-h-[320px] mx-auto mb-60" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 커스텀 CSS */}
            <style>{`
        .swiper-pagination-bullet {
          background-color: #e5e7eb;
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active-custom {
          background-color: #fb923c !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #909090; /* 회색 */
          width: 40px;
          height: 40px;
          margin: 0 20px;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
        </div>
    )
}

export default OnboardingPage