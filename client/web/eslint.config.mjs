// eslint.config.mjs

// --- 플러그인 import ---
// ESLint 기본 추천 규칙
import js from '@eslint/js'
// 브라우저 글로벌 변수 설정
import globals from 'globals'
// React 관련 린트 플러그인
import react from 'eslint-plugin-react'
// React Hooks 린트 플러그인
import reactHooks from 'eslint-plugin-react-hooks'
// React Fast Refresh 플러그인 (핫 리로드 관련)
import reactRefresh from 'eslint-plugin-react-refresh'
// Prettier와 ESLint 통합 플러그인
import prettier from 'eslint-plugin-prettier'
// import 문법 관련 린트 플러그인
import importPlugin from 'eslint-plugin-import'
// 타입스크립트 린트 플러그인
import typescriptEslint from '@typescript-eslint/eslint-plugin'
// 접근성(a11y) 관련 린트 플러그인
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
    // --- 무시할 파일 설정 ---
    {
        ignores: ['dist'], // 빌드 결과물(dist) 폴더는 린트 검사에서 제외
    },

    // --- 린트 적용 설정 ---
    {
        files: ['**/*.{js,jsx,ts,tsx}'], // 검사할 파일 확장자

        languageOptions: {
            ecmaVersion: 2020, // ECMAScript 버전
            globals: globals.browser, // 브라우저 환경 글로벌 변수 사용
            parserOptions: {
                ecmaVersion: 'latest', // 최신 ECMAScript 문법 지원
                ecmaFeatures: { jsx: true }, // JSX 지원
                sourceType: 'module', // ES 모듈 import/export 사용
            },
        },

        settings: {
            react: { version: 'detect' }, // React 버전 자동 감지
        },

        parser: '@typescript-eslint/parser', // 타입스크립트 전용 파서 사용

        plugins: {
            react, // React 린트 플러그인
            'react-hooks': reactHooks, // React Hooks 린트 플러그인
            'react-refresh': reactRefresh, // Fast Refresh 지원
            prettier, // Prettier 린트 플러그인
            import: importPlugin, // import 정리 플러그인
            '@typescript-eslint': typescriptEslint, // 타입스크립트 린트 플러그인
            'jsx-a11y': jsxA11y, // 접근성(a11y) 린트 플러그인
        },

        rules: {
            // --- Prettier 포맷팅 연동 ---
            'prettier/prettier': ['error', { endOfLine: 'auto' }],

            // --- 기본 ESLint 추천 규칙 적용 ---
            ...js.configs.recommended.rules,

            // --- React 추천 규칙 적용 ---
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            // --- 접근성(a11y) 추천 규칙 적용 ---
            ...jsxA11y.configs.recommended.rules,

            // --- React 세부 추가 규칙 ---
            'react/prop-types': 'off', // PropTypes 사용 안 함
            'react/react-in-jsx-scope': 'off', // React 17+ 부터 import 생략 가능
            'react/jsx-curly-spacing': ['error', { when: 'never', children: true }], // JSX 중괄호 공백 규칙
            'react/jsx-no-target-blank': 'off', // target="_blank" 보안 경고 끔
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ], // Fast Refresh 최적화

            // --- TypeScript 관련 규칙 ---
            '@typescript-eslint/no-unused-vars': 'warn', // 사용하지 않는 변수 경고

            // --- 코드 스타일 규칙 ---
            'semi': ['error', 'never'], // 세미콜론 금지
            'arrow-parens': ['warn', 'always'], // 화살표 함수 괄호 항상 사용
            'array-bracket-spacing': ['error', 'never'], // 배열 대괄호 공백 금지
            'camelcase': ['error', { properties: 'never' }], // 카멜케이스 권장 (프로퍼티 제외)
            'prefer-const': 'warn', // 가능하면 const 사용
            'prefer-template': 'warn', // 문자열 템플릿 리터럴 사용 권장
            'prefer-destructuring': ['warn', { array: true, object: true }], // 구조 분해 할당 권장
            'prefer-spread': 'warn', // 스프레드 연산자 사용 권장
            'no-console': 'warn', // console 사용 경고
            'no-undef': 'error', // 정의되지 않은 변수 금지
            'no-unused-vars': 'warn', // 사용하지 않는 변수 경고
            'no-multiple-empty-lines': ['error', { max: 2 }], // 연속 빈 줄 최대 2줄 제한
            'no-trailing-spaces': 'warn', // 줄 끝 공백 금지

            // --- import 관련 규칙 ---
            'import/named': 'error', // named import 검사
            'import/no-self-import': 'error', // 자기 자신 import 금지
            'import/no-cycle': 'error', // 순환 참조 금지
            'import/no-useless-path-segments': 'error', // 불필요한 경로 세그먼트 금지
            'import/no-unused-modules': 'error', // 사용되지 않는 모듈 금지
            'import/first': 'error', // import는 파일 최상단에 위치
            'import/no-duplicates': 'error', // 중복 import 금지
        },
    },
]
