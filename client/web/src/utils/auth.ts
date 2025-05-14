import { useAuthStore } from '@/store/authStore'
import { useUserStore } from '@/store/userStore'
import { toast } from 'sonner'

export const logoutUtil = (
  message?: string,
  redirectUrl: string = '/account/login'
) => {
  useAuthStore.getState().clearAccessToken()
  useUserStore.getState().clearUser()
  
  if (message) {
    toast.error(message)
  }
  
  window.location.href = redirectUrl
}