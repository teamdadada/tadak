/// <reference types="vite/client" />

interface Kakao {
  init: (apiKey: string) => void
  isInitialized: () => boolean
  Share: {
    sendDefault: (options: {
      objectType: string
      content: {
        title: string
        description: string
        imageUrl: string
        link: {
          mobileWebUrl: string
          webUrl: string
        }
      }
      buttons?: {
        title: string
        link: {
          mobileWebUrl: string
          webUrl: string
        }
      }[]
    }) => void
  }
  cleanup: () => void
}

interface Window {
  Kakao: Kakao
}
