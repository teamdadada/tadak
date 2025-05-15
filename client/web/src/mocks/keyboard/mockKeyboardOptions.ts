// mocks/keyboard/mockKeyboardOptions.ts
import { KeyboardOptionsResponse } from '@/types/keyboard'

export const mockKeyboardOptions: KeyboardOptionsResponse = {
  barebone: {
    layout: [
      { id: 1, name: '풀배열' },
      { id: 2, name: '텐키리스' },
    ],
    material: [
      { id: 3, name: '금속' },
      { id: 4, name: '플라스틱' },
    ],
  },
  switch: {
    type: [
      { id: 5, name: '청축' },
      { id: 6, name: '적축' },
      { id: 7, name: '갈축' },
      { id: 8, name: '흑축' },
    ],
  },
  keycap: {
    op: null,
  }
}
