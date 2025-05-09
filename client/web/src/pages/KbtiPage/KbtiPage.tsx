import { Outlet } from 'react-router-dom'

const KbtiPage = () => {
  return (
    <div className="min-h-[calc(100vh-68px)] max-w-xl mx-auto">
      <Outlet />
    </div>
  )
}

export default KbtiPage
