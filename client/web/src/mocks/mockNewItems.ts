import { MockItem } from './mockPopularItems'

const newMockData: Record<string, MockItem[]> = {
  베어본: [
    {
      name: '신상 베어본 1',
      price: 1100,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
    {
      name: '신상 베어본 2',
      price: 1080,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: true,
    },
    {
      name: '신상 베어본 3',
      price: 1150,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
    {
      name: '신상 베어본 4',
      price: 1120,
      imageUrl: '/assets/images/sample-barebone.png',
      liked: false,
    },
  ],
  스위치: [
    {
      name: '신상 스위치 1',
      price: 340,
      imageUrl: '/assets/images/sample-switch.png',
      liked: true,
    },
    {
      name: '신상 스위치 2',
      price: 350,
      imageUrl: '/assets/images/sample-switch.png',
      liked: false,
    },
    {
      name: '신상 스위치 3',
      price: 360,
      imageUrl: '/assets/images/sample-switch.png',
      liked: false,
    },
    {
      name: '신상 스위치 4',
      price: 370,
      imageUrl: '/assets/images/sample-switch.png',
      liked: false,
    },
  ],
  키캡: [
    {
      name: '신상 키캡 1',
      price: 190,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
    {
      name: '신상 키캡 2',
      price: 195,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: true,
    },
    {
      name: '신상 키캡 3',
      price: 185,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
    {
      name: '신상 키캡 4',
      price: 200,
      imageUrl: '/assets/images/sample-keycap.png',
      liked: false,
    },
  ],
}

export const getNewItems = (
  category: string,
  { page, size }: { page: number; size: number },
): MockItem[] => {
  const items = newMockData[category] || []
  const start = (page - 1) * size
  return items.slice(start, start + size)
}
