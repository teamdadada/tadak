import { Outlet } from 'react-router-dom'

const KbtiPage = () => {
  return (
    <div className="bg-[rgb(254,247,230)] h-full flex flex-col flex-1">
      <div className="flex justify-center flex-1 w-full h-full max-w-lg mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default KbtiPage
