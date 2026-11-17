import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { FormField } from '../../molecules/FormField/FormField'

export interface LoginFormData {
  identifier: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void
  onForgotPasswordClick?: () => void
  forgotPasswordHref?: string
}

function ArrowForwardIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 2.66669L7.06 3.60669L10.78 7.33335H2.66667V8.66669H10.78L7.06 12.3934L8 13.3334L13.3333 8.00002L8 2.66669Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LoginForm({
  onSubmit,
  onForgotPasswordClick,
  forgotPasswordHref = '#esqueci-senha',
}: LoginFormProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ identifier, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField
        id="login-identifier"
        name="identifier"
        label="Email ou usuário"
        type="text"
        placeholder="usuario123"
        autoComplete="username"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        required
      />

      <div className="flex flex-col gap-2">
        <FormField
          id="login-password"
          name="password"
          label="Senha"
          type="password"
          placeholder="******"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <Checkbox
            id="login-remember"
            name="rememberMe"
            label="Lembrar-me"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <a
            href={forgotPasswordHref}
            onClick={(event) => {
              if (onForgotPasswordClick) {
                event.preventDefault()
                onForgotPasswordClick()
              }
            }}
            className="text-[15px] leading-[1.5] text-[#E1E1E1] underline transition-colors hover:text-[#81FE88]"
          >
            Esqueci a senha
          </a>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" icon={<ArrowForwardIcon />}>
          Login
        </Button>
      </div>
    </form>
  )
}
