// src/components/common/PageIntroBanner.tsx
import { cn } from '@/lib/utils'

interface PageIntroBannerProps {
  title: string
  description: string
  backgroundColor?: string
  underline?: boolean
}

const PageIntroBanner = ({
  title,
  description,
  backgroundColor = 'bg-white',
  underline = false,
}: PageIntroBannerProps) => {
  return (
    <div className={cn('w-full', backgroundColor)}>
      <div className="flex flex-col items-center text-center py-10">
        <h1 className="text-base min-[1060px]:text-xl min-[1200px]:text-2xl font-bold">
          {title}
        </h1>
        <p className="mt-2 text-xs min-[1060px]:text-sm min-[1200px]:text-base text-gray-700">
          {description}
        </p>
      </div>

      {underline && (
        <div className="w-full flex justify-center px-4 min-[1060px]:px-6 min-[1200px]:px-8">
          <div
            className={cn(
              'h-[1px] w-full max-w-screen-xl bg-gray-200',
              'shadow-[0_1px_4px_0_rgba(0,0,0,0.1)]',
            )}
          />
        </div>
      )}
    </div>
  )
}

export default PageIntroBanner
