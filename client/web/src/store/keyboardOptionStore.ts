import { create } from 'zustand'
import { KeyboardOptionsResponse } from '@/types/keyboard'

interface KeyboardOptionState extends KeyboardOptionsResponse {
  setOptions: (options: KeyboardOptionsResponse) => void
}

export const useKeyboardOptionStore = create<KeyboardOptionState>((set) => ({
  barebone: { layout: [], material: [] },
  switch: { type: [] },
  keycap: { op: null },
  setOptions: (options) =>
    set((state) => ({
      ...state,
      ...options,
    })),
}))