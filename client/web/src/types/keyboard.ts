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

export interface SelectedProduct {
  productId: number
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface KeyboardDetailResponse {
  keyboardId: number
  name: string
  options: {
    bareboneOption: {
      layout: number
      material: number
    }
    switchOption: {
      type: number
    }
  }[]
  colors: {
    outerColor: string
    keycap: {
      basicColor: string
      pointColors: Record<string, string>
    }
  }
  selectedProducts: {
    barebone: SelectedProduct
    keycap: SelectedProduct
    switch: SelectedProduct
  }
  thumbnailUrl: string
  model3dUrl: string
}
