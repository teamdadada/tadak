import http from './http-common'

import { USER_END_POINT } from './endPoints'
import { SignUpRequest } from '@/types/user'

export const signUp = async (data: SignUpRequest) => {
  const response = await http.post(USER_END_POINT.SIGNUP, data)
  return response
}

// // 로그인
// // 예시로 작성해 둔 것이라 필요에 따라 수정 가능
// export const fetchSocialLogin = async (
//   socialType: string,
//   code: string,
// ): Promise<{ accessToken: string; userId: string; isNew: boolean }> => {
//   try {
//     const response = await http.post(
//       USER_END_POINT.SOCIAL_LOGIN(socialType, code),
//     )

//     const { accessToken, userId, isNew } = response.data?.result ?? {}

//     if (!accessToken || !userId) {
//       throw new Error('accessToken 또는 userId 없음')
//     }

//     return { accessToken, userId, isNew }
//   } catch (error: any) {
//     const message =
//       error.response?.data?.message || '소셜 로그인 중 문제가 발생했습니다.'

//     const matchedSocial = message.includes('KAKAO')
//       ? 'kakao'
//       : message.includes('NAVER')
//         ? 'naver'
//         : null

//     throw {
//       message,
//       socialType: matchedSocial,
//     }
//   }
// }

// // 로그아웃
// // 예시로 작성해 둔 것이라 필요에 따라 수정 가능
// export const logout = async (): Promise<void> => {
//   await http.post(USER_END_POINT.LOGOUT)
// }


