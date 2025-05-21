import { create } from 'zustand'
import type { Transform } from '@/components/customKeyboard/DeskCanvas'

// Transform 타입 예시:
// interface Transform {
//   position: { x: number; y: number; z: number }
//   rotation: { x: number; y: number; z: number }
//   scale: { x: number; y: number; z: number }
// }

interface DeskState {
  deskImageId: number | null
  setDeskImageId: (id: number | null) => void
  deskImageUrl: string | null
  setDeskImageUrl: (url: string | null) => void
  model3dUrl: string | null
  setModel3dUrl: (url: string | null) => void
  selectedKeyboardId: number | null
  setSelectedKeyboardId: (id: number | null) => void
  defaultTransform: Transform | null
  setDefaultTransform: (transform: Transform | null) => void
  isDirty: boolean
  setIsDirty: (dirty: boolean) => void
}

export const useDeskStore = create<DeskState>((set) => ({
  deskImageId: null,
  setDeskImageId: (id) => set({ deskImageId: id }),

  deskImageUrl: null,
  setDeskImageUrl: (url) => set({ deskImageUrl: url }),

  model3dUrl: null,
  setModel3dUrl: (url) => set({ model3dUrl: url }),

  selectedKeyboardId: null,
  setSelectedKeyboardId: (id) => set({ selectedKeyboardId: id }),

  defaultTransform: null,
  setDefaultTransform: (transform) => set({ defaultTransform: transform }),

  isDirty: false,
  setIsDirty: (dirty) => set({ isDirty: dirty }),
}))