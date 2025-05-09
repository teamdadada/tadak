// userService
export const USER_END_POINT = {
  SIGNUP: '/user/signup',
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
  POPULAR_ITEMS: (productType: string) => `/api/product/${productType}/popular`,
  LATEST_ITEMS: (productType: string) => `/api/product/${productType}/latest`,
}

// shopService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const SHOP_END_POINT = {
  FILTER: {
    BEARBONE: '/api/product/BAREBONE/filter',
    SWITCH: '/api/product/SWITCH/filter',
    KEYCAP: '/api/product/KEYCAP/filter',
  },
  PRODUCT: {
    LATEST: (type: string) => `/api/product/${type}/latest`,
    POPULAR: (type: string) => `/api/product/${type}/popular`,
    DETAIL: (type: string) => `/api/product/${type}`,
  },
}
