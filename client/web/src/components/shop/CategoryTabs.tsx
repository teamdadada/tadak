import Tabs from '@/components/ui/Tabs'
import { ReactNode, useState } from 'react'

interface CategoryTabsProps {
  items: string[] /** 탭 라벨 문자열 배열 */
  panels: ReactNode[] /** items 순서대로 대응되는 콘텐츠 */
  width?: number | string /** 전체 탭 컨테이너 고정 폭 (px) */
  tabWidth?: number | string /** 각 탭 버튼 고정 폭 (px) */
  indicatorWidth?: number | string
  indicatorHeight?: number /** 인디케이터(밑줄) 높이 (px) */
  indicatorClassName?: string /** 인디케이터 배경색 클래스 */
  className?: string /** 추가 Tailwind 클래스 */
}

const CategoryTabs = ({
  items,
  panels,
  width,
  tabWidth,
  indicatorWidth,
  indicatorHeight = 3,
  className,
}: CategoryTabsProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div>
      <Tabs
        items={items}
        selectedIndex={tabIndex}
        onChange={setTabIndex}
        width={width}
        tabWidth={tabWidth}
        indicatorWidth={indicatorWidth}
        indicatorHeight={indicatorHeight}
        className={className}
      />
      <div className="mt-4">{panels[tabIndex]}</div>
    </div>
  )
}

export default CategoryTabs
