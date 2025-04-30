import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
