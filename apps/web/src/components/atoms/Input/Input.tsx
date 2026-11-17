import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-[4px] bg-[#888888] px-4 py-2 text-[15px] leading-[1.5] text-[#171D1F] placeholder:text-[#171D1F]/70 focus:ring-2 focus:ring-[#81FE88] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
      {...props}
    />
  )
}
