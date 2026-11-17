import type { LabelHTMLAttributes, ReactNode } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label
      className={`block text-[18px] leading-[1.5] font-normal text-[#E1E1E1] ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  )
}
