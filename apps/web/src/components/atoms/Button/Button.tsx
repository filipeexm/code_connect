import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
}

export function Button({
  children,
  icon,
  variant = 'primary',
  fullWidth = true,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-[#81FE88] text-[#132E35] hover:bg-[#6be672]'
      : 'border border-[#81FE88] bg-transparent text-[#81FE88] hover:bg-[#81FE88]/10'

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-[18px] leading-[1.5] font-semibold transition-colors focus:ring-2 focus:ring-[#81FE88] focus:ring-offset-2 focus:ring-offset-[#171D1F] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses} ${widthClass} ${className}`.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
    </button>
  )
}
