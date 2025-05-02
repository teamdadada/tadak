import { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import ItemCard from '@/components/shop/ItemCard'

// 목업 데이터
const mockItems = [
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: true,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
]

const MainPage = () => {
    const [activePopularTab, setActivePopularTab] = useState(1)
    const [activeNewTab, setActiveNewTab] = useState(1)

    return (
        <div className="flex flex-col items-center w-full">
            {/* 배너 캐러셀 자리 */}
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center mb-12 rounded-md">
                <span className="text-gray-500">서비스 소개 배너</span>
            </div>

            {/* 지금 인기 있는 타닥템 */}
            <section className="w-full max-w-[1100px] px-4 mb-20">
                <div className="flex justify-between items-end mb-3">
                    <div className="text-xl font-bold text-tadak-black">🔥지금 인기 있는 타닥템</div>
                    <button className="text-medium text-orange-400 font-medium hover:underline">+ 더보기</button>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {mockItems.map((item, i) => (
                        <ItemCard key={i} {...item} />
                    ))}
                </div>
            </section>

            {/* 따끈따끈, 새로 들어온 타닥템 */}
            <section className="w-full max-w-[1100px] px-4 mb-24">
                <div className="flex justify-between items-end mb-3">
                    <div className="text-xl font-bold text-tadak-black">✨따끈따끈, 새로 들어온 타닥템</div>
                    <button className="text-medium text-orange-400 font-medium hover:underline">+ 더보기</button>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                    {mockItems.map((item, i) => (
                        <ItemCard key={i} {...item} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default MainPage