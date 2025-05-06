export type MockItem = {
  name: string
  price: number
  imageUrl: string
  liked: boolean
}

const popularMockData: Record<string, MockItem[]> = {
  베어본: [
    {
      name: '인기 베어본 1',
      price: 1000,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: true,
    },
    {
      name: '인기 베어본 2',
      price: 1050,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
    {
      name: '인기 베어본 3',
      price: 980,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
    {
      name: '인기 베어본 4',
      price: 1200,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
  ],
  스위치: [
    {
      name: '인기 스위치 1',
      price: 300,
      imageUrl: '/assets/images/sample-switch.png',
      liked: true,
    },
    {
      name: '인기 스위치 2',
      price: 320,
      imageUrl: '/assets/images/sample-switch.png',
      liked: false,
    },
    {
      name: '인기 스위치 3',
      price: 310,
      imageUrl: '/assets/images/sample-switch.png',
      liked: true,
    },
    {
      name: '인기 스위치 4',
      price: 330,
      imageUrl: '/assets/images/sample-switch.png',
      liked: false,
    },
  ],
  키캡: [
    {
      name: '인기 키캡 1',
      price: 150,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: true,
    },
    {
      name: '인기 키캡 2',
      price: 170,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
    {
      name: '인기 키캡 3',
      price: 160,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
    {
      name: '인기 키캡 4',
      price: 180,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
  ],
}

export const getPopularItems = (
  category: string,
  { page, size }: { page: number; size: number },
): MockItem[] => {
  const items = popularMockData[category] || []
  const start = (page - 1) * size
  return items.slice(start, start + size)
}
