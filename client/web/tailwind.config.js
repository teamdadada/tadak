/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],  // TailwindCSS가 사용할 파일 경로
  theme: {
    extend: {
      // 타닥 프로젝트 전용 색상
      colors: {
        'tadak-black': '#242424',          // 기본 블랙
        'tadak-primary': '#FCA41C',         // 주요 포인트 (주황색)
        'tadak-secondary': '#A4D232',       // 보조 포인트 (연두색)
        'tadak-warning': '#F16363',          // 경고 색상 (빨간색)
        'tadak-light-gray': '#F4F4F4',       // 밝은 회색
        'tadak-gray': '#BDBDBD',             // 중간 회색
        'tadak-dark-gray': '#909090',        // 진한 회색
        'tadak-white': '#FFFFFF',            // 흰색
      },

      // 사용자 정의 폰트
      fontFamily: {
        sans: ['Montserrat', 'Pretendard', 'sans-serif'], // 기본 폰트
        montserrat: ['Montserrat', 'sans-serif'],         // 몬트세라트 전용
        pretendard: ['Pretendard', 'sans-serif'],          // 프리텐다드 전용
      },
    },
  },
  plugins: [],
}