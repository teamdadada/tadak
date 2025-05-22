import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import ScrollToTop from '../common/ScrollToTop'

const BaseLayout = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default BaseLayout
