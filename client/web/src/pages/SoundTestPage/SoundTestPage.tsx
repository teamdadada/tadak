import PageHeader from './PageHeader'
import SideTab from './SideTab'
import TypingArea from './TypingArea'

const SoundTestPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="타닥 타건샵"
        description="실제로 키보드를 눌러보며, 축마다 다른 소리를 직접 타이핑으로 체험해보세요!"
      />

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-64">
          <SideTab />
        </div>

        <div className="flex-1">
          <TypingArea />
        </div>
      </div>
    </div>
  )
}

export default SoundTestPage
