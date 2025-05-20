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

// review
export const REVIEW_END_POINT = {
  LIST: (productId: number | string) => `/review/list/${productId}`,
  SCORE: (productId: number | string) => `/review/score/${productId}`,
  CREATE: (productId: number | string) => `/review/${productId}`,
  DELETE: (reviewId: number | string) => `/review/${reviewId}`,
  UPDATE: (productId: number | string) => `/review/${productId}`,
  MY_LIST: '/review/list/me',
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
  KEYCAP_PRODUCTS: '/keyboard/keycap',
  BAREBONE_PRODUCTS: (layoutId: number, materialId: number) =>
    `/keyboard/barebone?layout=${layoutId}&material=${materialId}`,
  SWITCH_PRODUCTS: (typeId: number) =>
    `/keyboard/switch?type=${typeId}`,
  UPDATE_PRODUCTS: (keyboardId: number) => `/keyboards/${keyboardId}/products`,
  MODEL_3D: (keyboardId: number) => `/keyboard/${keyboardId}/model`,
}

// backgroundService
export const BACKGROUND_END_POINT = {
  LIST: '/background',
  CREATE: '/background',
  DELETE: (backgroundId: number) => `/background/${backgroundId}`,
}

export const PLACEMENT_END_POINT = {
  DEFAULT: '/placement/default', // 디폴트 배치 정보 조회
  LIST: '/placement', // 배치 리스트 조회
  DETAIL: (placementId: number) => `/placement/${placementId}`, // 배치 상세 조회
  CREATE: '/placement', // 배치 저장 (POST)
  UPDATE: '/placement', // 배치 수정 (PATCH)
  DELETE: (placementId: number) => `/placement/${placementId}`, // 배치 삭제
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
