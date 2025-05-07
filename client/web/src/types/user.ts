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
