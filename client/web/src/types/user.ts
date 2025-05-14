export interface SignUpRequest {
  userId: string
  password: string
  nickname: string
}

export interface SignUpFormData {
  userId: string
  password: string
  nickname: string
  confirm: string
}

export interface ErrorResponse {
  status: number
  code: string
  message: string
}

export interface User {
  userUuid: number
  userId: string
  userName: string
  userType: string
  profileImg: string
  loginType: string
}

export interface UpdateNicknameRequest {
  nickname: string
}

export interface UpdateProfileImgRequest {
  file: File
}

export interface UpdatePasswordRequest {
  old: string
  new: string
}
