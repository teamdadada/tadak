import PageIntroBanner from '@/components/common/PageIntroBanner'

const CustomKeyboardPage = () => {
  return (
    <div>
      <PageIntroBanner
        title="✨ 나만의 키보드를 디자인하고, 내 책상 위에 직접 배치해보세요!"
        description="키보드를 직접 꾸미고 내 책상에 배치해보는 커스터마이징 시뮬레이션, 완성된 키보드는 저장하거나 다운로드도 가능해요!"
        backgroundColor="bg-white"
        underline
      />
      <div className="container mx-auto px-4 py-6">
        {/* 실제 페이지 내용 */}
      </div>
    </div>
  )
}

export default CustomKeyboardPage
