import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthState = {
  isAuthenticated: boolean
  accessToken: string | null
  setAccessToken: (token: string) => void
  clearAccessToken: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: localStorage.getItem('accessToken') || null,
      isAuthenticated: !!localStorage.getItem('accessToken'),

      setAccessToken: (token: string) => {
        localStorage.setItem('accessToken', token)
        set({ accessToken: token, isAuthenticated: true })
      },

      clearAccessToken: () => {
        localStorage.removeItem('accessToken')
        set({ accessToken: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
