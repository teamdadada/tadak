export type AxisType = 'Q' | 'E' | 'T' | 'A' | 'M' | 'F' | 'C' | 'P'

export interface KbtiQuestion {
  id: number
  text: string
  options: string[]
  axis: [AxisType, AxisType]
  image?: string | null
}

export type KbtiType =
  | 'QTMC'
  | 'QTMP'
  | 'QTFC'
  | 'QTFP'
  | 'QAMC'
  | 'QAMP'
  | 'QAFC'
  | 'QAFP'
  | 'ETMC'
  | 'ETMP'
  | 'ETFC'
  | 'ETFP'
  | 'EAMC'
  | 'EAMP'
  | 'EAFC'
  | 'EAFP'

export interface KbtiDescription {
  nickname: string
  description: string
  expressions: string[]
  image?: string | null
  shareImage?: string | null
}

export const kbtiQuestions: KbtiQuestion[] = [
  {
    id: 1,
    text: '타건음이 잘 들릴 때 집중이 잘 되나요?',
    options: ['아니요, 조용한 게 더 좋아요', '네, 찰칵찰칵 소리가 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 2,
    text: 'RGB나 조명이 있는 키보드가 마음에 드시나요?',
    options: ['눈에 띄는 건 별로예요', '감성적으로 너무 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 3,
    text: '소리가 적은 키보드와 반짝이는 키보드 중 고른다면?',
    options: ['조용한 키보드가 더 좋아요', '시각적으로 화려한 게 더 좋아요'],
    axis: ['Q', 'E'],
  },
  {
    id: 4,
    text: '키보드를 고를 때 가장 중요한 건 무엇인가요?',
    options: ['기능과 내구성이요', '디자인과 색감이요'],
    axis: ['T', 'A'],
  },
  {
    id: 5,
    text: '주변에 추천할 때 뭐라고 말할 것 같나요?',
    options: ['이건 성능이 정말 좋아', '이건 너무 예쁘고 분위기 있어'],
    axis: ['T', 'A'],
  },
  {
    id: 6,
    text: '키보드 설명에서 어떤 부분이 먼저 눈에 들어오나요?',
    options: ['스펙과 기능 정보', '이미지와 디자인 포인트'],
    axis: ['T', 'A'],
  },
  {
    id: 7,
    text: '책상 위에 물건은 어느 정도만 올려두시나요?',
    options: [
      '자주 쓰는 것만 올려둬요',
      '장비랑 악세서리 다 올려두는 편이에요',
    ],
    axis: ['M', 'F'],
  },
  {
    id: 8,
    text: '거치대, 데스크패드, 무드등… 이런 것들',
    options: ['없어도 괜찮아요', '있어야 책상이 완성된 느낌이에요'],
    axis: ['M', 'F'],
  },
  {
    id: 9,
    text: '책상에 내가 직접 고른 장비가 몇 개나 있나요?',
    options: ['1~2개만 있어요', '종류별로 다양하게 있어요'],
    axis: ['M', 'F'],
  },
  {
    id: 10,
    text: '책상을 쓸 때 상태는 어떤가요?',
    options: ['항상 정리돼 있어요', '자주 어질러져 있어요'],
    axis: ['C', 'P'],
  },
  {
    id: 11,
    text: '정리된 책상이 일할 때 도움이 되나요?',
    options: ['네, 깔끔해야 집중돼요', '아니요, 어느 정도 지저분해도 괜찮아요'],
    axis: ['C', 'P'],
  },
  {
    id: 12,
    text: '누가 갑자기 내 책상을 본다면?',
    options: ['정리되어 있어서 부끄럽지 않다', '이건 내 스타일, 손대지 마!'],
    axis: ['C', 'P'],
  },
]

export const kbtiDescriptions: Record<KbtiType, KbtiDescription> = {
  QTMC: {
    nickname: '정리된 기술 마스터',
    description:
      '성능과 실용성을 최우선으로 하며, 책상에 필요한 장비만 두고 깔끔하게 정리하시는군요!',
    expressions: [
      '필요한 것만 책상에 올려두고 싶어요.',
      'RGB보다는 깔끔한 디자인이 좋아요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/47ef6b85-a195-4d84-87b3-e01e27ec9d36_QTMC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/da0c93fc-ee3a-4bb5-8f25-9b5ca9549d5e_QTMC.png',
  },
  QTMP: {
    nickname: '조용한 정리 회피자',
    description: '성능을 우선시하지만 정리는 뭐... 편하면 돼죠!',
    expressions: [
      '중요한 건 성능이지, 정리는 나중에 해도 돼요.',
      '필요한 건 여기저기 두는 편이에요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/2bc0849f-e0b9-44f9-a5aa-e6e702134d08_QTMP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/959b339c-a4b7-49c3-967b-8eb7d3e0a43b_QTMP.png',
  },
  QTFC: {
    nickname: '정리된 성능 애호가',
    description:
      '다양한 성능 좋은 장비를 사용하는 것을 좋아하면서도, 굉장히 깔끔하게 정리하고 체계적으로 관리를 잘 하시네요!',
    expressions: [
      '장비는 많지만, 다 깔끔하게 정리돼 있어요.',
      '성능 좋은 장비들이 제 책상을 완성하죠.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/37048e93-2b7b-41a5-a27f-ab0dcd94b813_QTFC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/7d2fc855-e9aa-436e-bd03-dff90ea37a1d_QTFC.png',
  },
  QTFP: {
    nickname: '혼돈의 기술 덕후',
    description:
      '성능 좋은 장비를 많이 사용하며, 책상은 항상 다양한 장비로 채워져 있군요! 정리는 힘들겠어요.',
    expressions: [
      '성능이 제일 중요해요. 정리는 나중 문제죠.',
      '어디에 두었는지 아는 게 중요하죠.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/7a35d195-77f9-4aaf-b832-09b057e911e0_QTFP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/affe7e18-979b-40e8-b454-e36a7df1dd7e_QTFP.png',
  },
  QAMC: {
    nickname: '감성 깔끔주의자',
    description:
      '심플하고 감성적인 디자인을 선호하며, 불필요한 장비 없이 깔끔하게 데스크를 잘 꾸미시네요!',
    expressions: [
      '디자인이 예쁘면서도 깔끔해야 해요.',
      '필요한 것만 놓고 미니멀하게 유지하고 싶어요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/09536de5-b588-4d23-9f00-14a8611d51dd_QAMC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/9e69c995-a7ef-4546-a571-695b8467f584_QAMC.png',
  },
  QAMP: {
    nickname: '감성 무질서주의자',
    description:
      '감성적인 아이템을 좋아하지만, 정리는 뭐... 대충 놔도 감성이죠!',
    expressions: ['예쁜 건 많을수록 좋아요.', '정리보다는 감성이 중요하죠.'],
    image:
      'https://minio.tadak.kr/kbti/uploads/832e180c-c659-4421-bcfb-5e08db1d51ce_QAMP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/4ffdf009-8888-4ff4-b306-cc978934342e_QAMP.png',
  },
  QAFC: {
    nickname: '감성 장비 마스터',
    description:
      '다양한 감성적인 아이템을 갖추고 있으면서도, 깔끔하고 체계적으로 정리를 잘 하시네요!',
    expressions: [
      '예쁘고 깔끔한 데스크가 제 취향이에요.',
      '디자인과 깔끔함 모두 놓칠 수 없어요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/b9906c53-d47e-4530-a635-5bee54f2b33a_QAFC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/8bd65dc6-12ac-40c3-bee3-a3527b2d0fe6_QAFC.png',
  },
  QAFP: {
    nickname: '감성 혼돈주의자',
    description:
      '감성적이고 다양한 아이템을 좋아하여 책상에 많이 두지만, 정리는 뭐... 자연스러운 어수선함도 감성 아니겠어요?',
    expressions: [
      '책상에 감성적인 게 많아야 제 스타일이죠.',
      '예쁜 것들이 많아도 어디에 있는지는 알아요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/1aca16e1-f402-4232-8b94-3e87cdc23bae_QAFP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/f9447630-eb6c-4392-a077-cd67b1a010d7_QAFP.png',
  },
  ETMC: {
    nickname: '화려한 정리 마스터',
    description:
      '성능도 중요하지만, 디자인적인 요소로 눈에 띄는 게 중요하죠! 화려하면 정리도 잘 되어야 예쁘겠죠?',
    expressions: [
      '성능도 좋고 디자인도 눈에 띄어야죠.',
      '깔끔하지만 존재감 있는 게 좋아요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/1e1fe982-b83a-4148-9ee9-c5f8f9695eba_ETMC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/456707ab-9112-42f8-a40f-83dce46ba149_ETMC.png',
  },
  ETMP: {
    nickname: '화려한 무질서주의자',
    description:
      '성능과 디자인 모두 중요한 사람으로, 장비는 화려... 정리도 나름의 규칙이 있는 거죠!',
    expressions: [
      '화려한 장비들이 여기저기 있어야 마음이 편해요.',
      '정리보다는 멋진 게 우선이에요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/ae80fb7e-f55a-4bb6-814e-04be9420c0cc_ETMP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/8593e038-c873-4f24-8b77-8911b5d631ab_ETMP.png',
  },
  ETFC: {
    nickname: '화려한 성능 마스터',
    description:
      '성능 좋은 화려한 장비들을 완벽히 정리하고 깔끔하게 유지하시는군요!',
    expressions: [
      '성능과 디자인, 둘 다 놓칠 수 없어요.',
      '화려해도 깔끔하게 정리된 게 좋아요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/3df79ba0-73f0-4e3f-a499-5c9dd756f95a_ETFC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/013764ba-80a6-430b-bdd7-68a786c822fc_ETFC.png',
  },
  ETFP: {
    nickname: '화려한 혼돈주의자',
    description: '성능도 좋고, 디자인도 화려하지만.. 정리? 그게 뭐죠?',
    expressions: ['화려하고 성능 좋은 게 최고죠.', '정리는 나중에 할게요.'],
    image:
      'https://minio.tadak.kr/kbti/uploads/bd668820-552b-4a82-b6c9-3a368082c726_ETFP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/27ca5f64-b3d7-4ef1-aceb-03e3a82b3a13_ETFP.png',
  },
  EAMC: {
    nickname: '화려한 감성 마스터',
    description:
      '감성적이고 화려한 디자인을 선호하지만, 깔끔하게 정리하는 게 가장 중요하죠!',
    expressions: [
      '예쁘면서 깔끔해야 완벽하죠.',
      '감성적인 것도 정리가 필요해요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/80768b1b-8b57-488c-97b9-1464aac8c4ad_EAMC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/dc99c8c1-8c21-4e60-a45a-0227fac01a94_EAMC.png',
  },
  EAMP: {
    nickname: '화려한 감성 혼돈주의자',
    description:
      '감성적이고 화려한 디자인을 좋아하고고, 다양한 아이템이 책상에 놓여 있어야 더 예쁘죠!',
    expressions: [
      '예쁜 것들은 많아야 기분이 좋아요.',
      '정리보다는 감성적인 느낌이 중요해요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/c9c9bad9-adbb-4a4f-a29f-55e7dfae0525_EAMP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/bf206e07-3486-4453-914e-247fc6e87e99_EAMP.png',
  },
  EAFC: {
    nickname: '감성 장비 정리 마스터',
    description:
      '감성적인 장비와 악세서리를 많이 소유하면서도, 이를 깔끔하게 정리해야 더 돋보이지 않겠어요?',
    expressions: [
      '예쁘고 정돈된 게 진짜 감성이에요.',
      '장비가 많아도 깔끔하게 유지할 수 있어요.',
    ],
    image:
      'https://minio.tadak.kr/kbti/uploads/5a5f1ff3-79c2-4a69-be1c-a7bc7580baac_EAFC.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/c99a189e-2964-47ee-a7d1-8fff4c42042a_EAFC.png',
  },
  EAFP: {
    nickname: '감성 혼돈 마스터',
    description:
      '감성적이고 화려한 디자인을 사랑하며, 다양한 아이템이 가득한 책상이야말로 최고죠?',
    expressions: ['예쁜 게 많아야 행복해요.', '어지러워도 감성적인 게 최고죠.'],
    image:
      'https://minio.tadak.kr/kbti/uploads/83f6c72e-f02c-4ce8-a17b-ee9d7dab1674_EAFP.png',
    shareImage:
      'https://minio.tadak.kr/kbti/uploads/6364196d-59c2-4755-897d-e739909f8179_EAFP.png',
  },
}
