import { cn } from '@/lib/utils'
import React from 'react'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-tadak-light-gray bg-white px-3 py-2 text-sm shadow-sm placeholder:text-tadak-dark-gray focus:outline-none focus:ring-2 focus:ring-tadak-primary focus:border-transparent resize-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

export { Textarea }
