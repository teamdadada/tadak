import './App.css'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
      <Toaster
        position="top-center"
        richColors={true}
        toastOptions={{
          style: {
            background: 'white',
            border: 'none',
          },
          classNames: {
            title: '!text-black',
            description: '!text-black',
          },
        }}
      />
    </>
    // react-query 전역 설정
  )
}

export default App
