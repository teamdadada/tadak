import { Outlet } from 'react-router-dom'

const KbtiStartPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🔍 KBTI 테스트 페이지</h1>
      <p>당신의 키보드 성향을 알아보세요!</p>
      <Outlet />
    </div>
  )
}

export default KbtiStartPage
