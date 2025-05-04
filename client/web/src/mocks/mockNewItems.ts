import { MockItem } from './mockPopularItems'

const newItems: MockItem[] = [
    {
        name: '따끈따끈 스위치',
        price: 520,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '따끈따끈 키캡',
        price: 300,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '따끈따끈 베어본',
        price: 980,
        imageUrl: '/assets/images/sample-switch.png',
        liked: false,
    },
    {
        name: '따끈따끈 베어본',
        price: 990,
        imageUrl: '/assets/images/sample-switch.png',
        liked: true,
    },
]

export const getNewItems = () => newItems