import { create } from 'zustand'

interface SoundState {
  selectedSoundKey: string
  setSelectedSoundKey: (key: string) => void
}

export const useSoundStore = create<SoundState>((set) => ({
  selectedSoundKey: '',
  setSelectedSoundKey: (key) => set({ selectedSoundKey: key }),
}))
