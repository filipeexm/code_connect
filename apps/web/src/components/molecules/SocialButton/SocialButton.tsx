import type { ButtonHTMLAttributes } from 'react'

export interface SocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  iconSrc: string
  iconAlt?: string
}

export function SocialButton({
  label,
  iconSrc,
  iconAlt,
  className = '',
  type = 'button',
  ...props
}: SocialButtonProps) {
  return (
    <button
      type={type}
      className={`group inline-flex cursor-pointer flex-col items-center gap-1.5 text-[#E1E1E1] transition-opacity hover:opacity-80 focus:ring-2 focus:ring-[#81FE88] focus:outline-none ${className}`.trim()}
      {...props}
    >
      <img
        src={iconSrc}
        alt={iconAlt ?? label}
        className="h-8 w-8 object-contain"
      />
      <span className="text-[13px] leading-[1.5] font-normal text-[#E1E1E1]">
        {label}
      </span>
    </button>
  )
}
