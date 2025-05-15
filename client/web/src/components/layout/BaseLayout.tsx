import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'

const BaseLayout = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default BaseLayout
