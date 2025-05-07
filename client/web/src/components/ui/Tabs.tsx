import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TabsProps {
  items: string[]; /** 탭 라벨 문자열 배열 */
  selectedIndex: number; /** 선택된 탭 인덱스 */
  onChange: (index: number) => void; /** 탭 클릭 시 호출될 콜백 */
  width?: number | string; /** 전체 탭 컨테이너 폭 */
  tabWidth?: number | string; /** 각 탭 버튼 폭 */
  indicatorHeight?: number; /** 인디케이터(밑줄) 높이 (px) */
  indicatorWidth?: number | string; /** 인디케이터 너비 . 없으면 tabWidth 혹은 컨테이너 폭/items.length */
  indicatorClassName?: string; /** 인디케이터 배경색 Tailwind 클래스 (추가로 덮어쓰기) */
  className?: string; /** 외부 추가 Tailwind 클래스 */
  tabClassName?: string; 
}

const Tabs = ({
  items,
  selectedIndex,
  onChange,
  width,
  tabWidth,
  indicatorHeight = 2,
  indicatorWidth,
  indicatorClassName,
  className,
  tabClassName
}: TabsProps) => {
  const handleClick = (i: number) => () => onChange(i)

  // 컨테이너, 탭 버튼, 인디케이터 너비 계산
  const containerStyle = width ? { width } : {}
  const tabStyle = tabWidth ? { width: tabWidth } : { flex: 1 }
  const indWidth =
    indicatorWidth ??
    tabWidth ??
    (typeof width === 'number' ? width / items.length : undefined)

  const left =
    typeof indWidth === 'number'
      ? indWidth * selectedIndex
      : indWidth
        ? `calc(${indWidth} * ${selectedIndex})`
        : undefined

  return (
    <div
      className={cn('relative flex border-b border-tadak-gray', className)}
      style={containerStyle}
    >
      {items.map((label, i) => (
        <button
          key={i}
          onClick={handleClick(i)}
          className={cn(
            "py-2 text-sm font-medium focus:outline-none",
            i === selectedIndex ? "text-tadak-primary" : "text-tadak-dark-gray",
            tabClassName
          )}
          style={tabStyle}
        >
          {label}
        </button>
      ))}

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'absolute bottom-0 rounded z-10 bg-tadak-primary',
          indicatorClassName,
        )}
        style={{
          height: indicatorHeight,
          width: indWidth,
          left,
          bottom: -1,
        }}
      />
    </div>
  )
}

export default Tabs
