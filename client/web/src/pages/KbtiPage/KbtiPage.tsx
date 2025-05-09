import { Outlet } from 'react-router-dom'

const KbtiPage = () => {
  return (
    <div className="bg-[rgb(254,247,230)]">
      <div className="min-h-[calc(100vh-68px)] max-w-xl mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default KbtiPage
