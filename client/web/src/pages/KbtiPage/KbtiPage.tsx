import { Outlet } from 'react-router-dom'

const KbtiPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-xl mx-auto">
      <Outlet />
    </div>
  )
}

export default KbtiPage
