// userService
export const USER_END_POINT = {
  SIGNUP: '/user/signup',
  ME: '/user/me',
  NICKNAME: '/user/nickname',
  IMG: '/user/img',
  PASSWORD: '/user/password',
}

// authService
export const AUTH_END_POINT = {
  LOGIN: '/auth/login',
  CHECK: '/auth/check',
  REISSUE: '/auth/reissue',
  KAKAOLOGIN: '/auth/kakao',
  NAVERLOGIN: '/auth/naver',
}

// mainService
export const MAIN_END_POINT = {
  PRODUCT_LIST: '/product/list',
}

// shopService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const SHOP_END_POINT = {
  FILTER: {
    BEARBONE: '/product/BAREBONE/filter',
    SWITCH: '/product/SWITCH/filter',
    KEYCAP: '/product/KEYCAP/filter',
  },
  PRODUCT: {
    LIST: '/product/list',
    DETAIL: (type: string) => `/product/${type}`,
  },
}

//chatbotService
export const CHATBOT_END_POINT = {
  SEND_MESSAGE: '/chat',
  GET_HISTORY: '/chat',
}

// keyboardService
export const KEYBOARD_END_POINT = {
  LIST: '/keyboard',
  CREATE: '/keyboard',
  DETAIL: (keyboardId: number) => `/keyboard/${keyboardId}`,
  UPDATE: (keyboardId: number) => `/keyboard/${keyboardId}`,
  DELETE: (keyboardId: number) => `/keyboard/${keyboardId}`,
  OPTION: '/keyboard/option',
  PRODUCT_BY_CATEGORY: (categoryName: string) =>
    `/keyboard/product?category=${categoryName}`,
  SELECTED_PRODUCTS: (keyboardId: number) => `/keyboard/${keyboardId}/products`,
  UPDATE_PRODUCTS: (keyboardId: number) => `/keyboards/${keyboardId}/products`,
  MODEL_3D: (keyboardId: number) => `/keyboard/${keyboardId}/model`,
  SAVE_ARRANGEMENT: '/keyboard/arrangements',
}

// backgroundService
export const BACKGROUND_END_POINT = {
  LIST: '/background',
  CREATE: '/background',
  DELETE: (backgroundId: number) => `/background/${backgroundId}`,
}

// cartService
export const CART_END_POINT = {
  ADD: '/cart',
}

// minioService
export const MINIO_END_POINT = {
  UPLOAD: (bucketName: string) => `/images/${bucketName}`,
}

// zzimService
export const ZZIM_END_POINT = {
  ADD: (productId: number) => `/zzim/${productId}`,
  LIST: '/zzim/list',
  DELETE: (productId: number) => `/zzim/${productId}`,
  COUNT: '/zzim/cnt',
}
