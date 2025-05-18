// types/keyboard.ts

// 키보드 목록 정보
export interface KeyboardSummary {
  keyboardId: number
  name: string
  thumbnailUrl: string
}

// 선택 옵션 항목 (layout, material 등)
export interface KeyboardOptionItem {
  id: number
  name: string
}

// /keyboard/option API 응답 타입
export interface KeyboardOptionsResponse {
  barebone: {
    layout: KeyboardOptionItem[]
    material: KeyboardOptionItem[]
  }
  switch: {
    type: KeyboardOptionItem[]
  }
  keycap: {
    op: null
  }
}