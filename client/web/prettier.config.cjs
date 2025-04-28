// prettier.config.cjs

module.exports = {
    // HTML의 공백 감도 설정 (CSS 설정에 따름)
    htmlWhitespaceSensitivity: 'css',

    // 문자열은 작은따옴표(') 사용
    singleQuote: true,

    // 문장 끝에 세미콜론(;) 사용하지 않음
    semi: false,

    // 긴 텍스트(마크다운 등) 줄바꿈 설정: 작성된 그대로 유지
    proseWrap: 'preserve',

    // 객체 속성 이름에 필요한 경우만 따옴표 사용
    quoteProps: 'as-needed',

    // 탭 대신 스페이스 사용
    useTabs: false,

    // 들여쓰기 너비: 2칸
    tabWidth: 2,

    // 한 줄 최대 길이: 80자
    printWidth: 80,

    // 화살표 함수 매개변수 괄호 항상 사용 (ex: (x) => x)
    arrowParens: 'always',

    // 마지막 항목에도 쉼표 추가 (객체, 배열, 함수 매개변수 등 모두)
    trailingComma: 'all',

    // 객체 리터럴 중괄호 앞뒤에 공백 추가 (ex: { foo: bar })
    bracketSpacing: true,

    // JSX에서 닫는 괄호(`>`)를 새로운 줄에 작성
    bracketSameLine: false,

    // 운영체제에 맞게 자동으로 줄바꿈 문자 설정 (CRLF, LF)
    endOfLine: 'auto',
};