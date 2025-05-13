// userService
export const USER_END_POINT = {
  SIGNUP: '/user/signup',
  ME: '/user/me',
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
  SEND_MESSAGE: '/api/chat',
  GET_HISTORY: (userId: string) => `/api/chat/${userId}`,
}
