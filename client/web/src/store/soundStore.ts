import { create } from 'zustand'

interface SoundState {
  selectedSoundKey: string
  setSelectedSoundKey: (key: string) => void
}

export const useSoundStore = create<SoundState>((set) => ({
  selectedSoundKey: 'G PRO 2.0 적축',
  setSelectedSoundKey: (key) => set({ selectedSoundKey: key }),
}))
