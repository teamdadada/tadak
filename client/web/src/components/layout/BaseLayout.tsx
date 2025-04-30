import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import { Toaster } from 'sonner'

const BaseLayout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-1">
                <Outlet />
                <Toaster />
            </main>
        </div>
    )
}

export default BaseLayout
