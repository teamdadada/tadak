import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { User } from '@/types/user'
import { ZzimListResponse, ZzimRecord } from '@/types/zzim'

interface UserState {
  // State
  user: User | null
  isLoaded: boolean
  lastUpdated: number | null
  zzimList: ZzimRecord[]

  // Action
  setUser: (user: User) => void
  clearUser: () => void

  setZzimList: (zzimResponse: ZzimListResponse) => void
  addZzimItem: (zzim: ZzimRecord) => void
  removeZzimItem: (zzimId: number) => void
  clearZzimList: () => void

  // Computed Values
  getIsLoggedIn: () => boolean
  getUserId: () => string | undefined
  getUserName: () => string | undefined
  getProfileImage: () => string | undefined
  getLoginType: () => string | undefined

  isZzimItem: (productId: number) => boolean
}

const initialState = {
  user: null,
  isLoaded: false,
  lastUpdated: null,
  zzimList: [],
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

      setZzimList: (zzimResponse: ZzimListResponse) => {
        set((state) => {
          state.zzimList = zzimResponse.zzims
        })
      },

      addZzimItem: (zzim: ZzimRecord) => {
        set((state) => {
          state.zzimList.push(zzim)
        })
      },

      removeZzimItem: (zzimId: number) => {
        set((state) => {
          state.zzimList = state.zzimList.filter(
            (item) => item.zzimId !== zzimId,
          )
        })
      },

      clearZzimList: () => {
        set((state) => {
          state.zzimList = []
        })
      },

      getIsLoggedIn: () => !!get().user,
      getUserId: () => get().user?.userId,
      getUserName: () => get().user?.userName,
      getProfileImage: () => get().user?.profileImg,
      getLoginType: () => get().user?.loginType,

      isZzimItem: (productId: number) => {
        return get().zzimList.some((item) => item.item.productId === productId)
      },
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isLoaded: state.isLoaded,
        lastUpdated: state.lastUpdated,
        zzimlist: state.zzimList,
      }),
    },
  ),
)
