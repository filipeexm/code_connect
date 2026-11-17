import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({
  label,
  id,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center gap-2 select-none ${className}`.trim()}
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[3px] border-2 border-[#888888] bg-transparent transition-colors checked:border-[#888888] checked:bg-transparent focus:ring-2 focus:ring-[#81FE88] focus:outline-none"
          {...props}
        />
        <svg
          className="pointer-events-none absolute h-3 w-3 text-[#888888] opacity-0 transition-opacity peer-checked:opacity-100"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label ? (
        <span className="text-[15px] leading-[1.5] text-[#888888]">
          {label}
        </span>
      ) : null}
    </label>
  )
}
