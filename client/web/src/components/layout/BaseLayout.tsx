import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'

const BaseLayout = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            {/* 항상 상단에 고정되는 헤더 */}
            <Header />

            {/* 페이지별 콘텐츠 영역 */}
            <main className="flex-1 px-[40px] py-6">
                <Outlet />
            </main>
        </div>
    )
}

export default BaseLayout