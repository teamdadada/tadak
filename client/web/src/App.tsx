import './App.css'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient()

function App() {
  return (
    // react-query 전역 설정
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
