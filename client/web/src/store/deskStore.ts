import { create } from 'zustand'
import type { Transform } from '@/components/customKeyboard/DeskCanvas'

interface DeskState {
  model3dUrl: string | null
  setModel3dUrl: (url: string | null) => void
  selectedKeyboardId: number | null
  setSelectedKeyboardId: (id: number | null) => void
  defaultTransform: Transform | null
  setDefaultTransform: (transform: Transform | null) => void
}
  
export const useDeskStore = create<DeskState>((set) => ({
  model3dUrl: null,
  setModel3dUrl: (url) => set({ model3dUrl: url }),
  selectedKeyboardId: null,
  setSelectedKeyboardId: (id) => set({ selectedKeyboardId: id }),
  defaultTransform: null,
  setDefaultTransform: (transform) => set({ defaultTransform: transform }),
}))
  