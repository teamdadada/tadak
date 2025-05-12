import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('로그인이 필요한 서비스입니다.')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/account/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
