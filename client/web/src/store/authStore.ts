import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean

  getIsAuthenticated: () => boolean

  setAccessToken: (token: string) => void
  clearAccessToken: () => void
}

const initialState = {
  accessToken: null,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      getIsAuthenticated: () => get().isAuthenticated,

      setAccessToken: (token: string) => {
        set((state) => {
          state.accessToken = token
          state.isAuthenticated = true
        })
      },

      clearAccessToken: () => {
        set((state) => {
          state.accessToken = null
          state.isAuthenticated = false
        })
      },
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
