export type MockItem = {
    name: string
    price: number
    imageUrl: string
    liked: boolean
}

const popularItems: MockItem[] = [
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: true,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '내 사랑 스위치',
        price: 480,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
]

export const getPopularItems = () => popularItems  