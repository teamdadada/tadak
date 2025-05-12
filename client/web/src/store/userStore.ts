import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { User } from '@/types/user'

interface UserState {
  // State
  user: User | null
  isLoaded: boolean
  lastUpdated: number | null

  // Action
  setUser: (user: User) => void
  clearUser: () => void

  // Computed Values
  isLoggedIn: boolean
  userName?: string
  profileImage?: string
}

const initialState = {
  user: null,
  isLoaded: false,
  lastUpdated: null,
}

export const useUserStore = create<UserState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      setUser: (user: User) => {
        set((state) => {
          state.user = user
          state.isLoaded = true
          state.lastUpdated = Date.now()
        })
      },

      clearUser: () => {
        set((state) => {
          state.user = null
          state.isLoaded = false
          state.lastUpdated = null
        })
      },

      get isLoggedIn() {
        return !!get().user
      },
      get userName() {
        return get().user?.userName
      },
      get profileImage() {
        return get().user?.profileImg
      },
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoaded: state.isLoaded,
        lastUpdated: state.lastUpdated,
      }),
    },
  ),
)
