export interface DividerProps {
  text?: string
  className?: string
}

export function Divider({ text, className = '' }: DividerProps) {
  if (!text) {
    return (
      <hr
        className={`h-px w-full border-0 bg-[#E1E1E1]/40 ${className}`.trim()}
      />
    )
  }

  return (
    <div
      className={`flex w-full items-center gap-3 ${className}`.trim()}
      role="separator"
    >
      <span className="h-px flex-1 bg-[#E1E1E1]/50" />
      <span className="text-[15px] leading-[1.5] whitespace-nowrap text-[#E1E1E1]">
        {text}
      </span>
      <span className="h-px flex-1 bg-[#E1E1E1]/50" />
    </div>
  )
}
