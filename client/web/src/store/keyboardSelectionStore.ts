import { create } from 'zustand'

interface KeyboardSelectionState {
  selectedLayoutId: number | null
  selectedMaterialId: number | null
  selectedSwitchTypeId: number | null
  selectedKeycapId: number | null
  setSelection: (key: keyof KeyboardSelectionState, value: number | null) => void
}

export const useKeyboardSelectionStore = create<KeyboardSelectionState>((set) => ({
  selectedLayoutId: null,
  selectedMaterialId: null,
  selectedSwitchTypeId: null,
  selectedKeycapId: null,
  setSelection: (key, value) => set((state) => ({ ...state, [key]: value })),
}))