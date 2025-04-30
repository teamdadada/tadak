import axios from 'axios'

const http = axios.create({
    baseURL: 'https://dapi.tadak.kr',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // refreshToken 쿠키로 보낼 수 있도록 설정
})

// 요청 인터셉터: accessToken 자동 첨부
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default http