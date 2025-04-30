import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <Outlet />
          <Toaster />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
