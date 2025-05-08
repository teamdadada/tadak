// userService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const USER_END_POINT = {
  SIGNUP: '/user/signup',

  SOCIAL_LOGIN: (socialType: string, code: string) =>
    `/auth/login/${socialType}?code=${code}`,
  LOGOUT: '/auth/logout',
  GET_USER_INFO: '/users',
  UPDATE_EMAIL: '/users',
  SEND_EMAIL_CODE: '/users/emails/send',
  VERIFY_EMAIL_CODE: (code: string) => `/users/emails/verify?code=${code}`,
  DELETE_USER: '/users',
}

export const AUTH_END_POINT = {
  LOGIN: '/auth/login',
  CHECK: '/auth/check',
  REISSUE: '/auth/reissue',
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
    BEARBONE: '/api/product/BAREBONE',
    SWITCH: '/api/product/SWITCH',
    KEYCAP: '/api/product/KEYCAP',
    LATEST: (type: string) => `/api/product/${type}/latest`,
    POPULAR: (type: string) => `/api/product/${type}/popular`,
  },
}
