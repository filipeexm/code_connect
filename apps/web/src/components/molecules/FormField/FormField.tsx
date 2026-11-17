import { Input } from '../../atoms/Input/Input'
import type { InputProps } from '../../atoms/Input/Input'
import { Label } from '../../atoms/Label/Label'

export interface FormFieldProps extends InputProps {
  id: string
  label: string
  error?: string
  containerClassName?: string
}

export function FormField({
  id,
  label,
  error,
  containerClassName = '',
  ...inputProps
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`.trim()}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
      />
      {error ? (
        <span id={errorId} role="alert" className="text-xs text-red-400">
          {error}
        </span>
      ) : null}
    </div>
  )
}
