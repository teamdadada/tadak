// userService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const USER_END_POINT = {
    SOCIAL_LOGIN: (socialType: string, code: string) =>
        `/auth/login/${socialType}?code=${code}`,
    LOGOUT: '/auth/logout',
    GET_USER_INFO: '/users',
    UPDATE_EMAIL: '/users',
    SEND_EMAIL_CODE: '/users/emails/send',
    VERIFY_EMAIL_CODE: (code: string) => `/users/emails/verify?code=${code}`,
    DELETE_USER: '/users',
}

// mainService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const MAIN_END_POINT = {

}

// shopService
// 예시로 작성해 둔 것이라 필요에 따라 수정 가능
export const SHOP_END_POINT = {

}
