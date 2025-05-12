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
  getIsLoggedIn: () => boolean
  getUserId: () => string | undefined
  getUserName: () => string | undefined
  getProfileImage: () => string | undefined
  getLoginType: () => string | undefined
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

      getIsLoggedIn: () => !!get().user,
      getUserId: () => get().user?.userId,
      getUserName: () => get().user?.userName,
      getProfileImage: () => get().user?.profileImg,
      getLoginType: () => get().user?.loginType,
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
