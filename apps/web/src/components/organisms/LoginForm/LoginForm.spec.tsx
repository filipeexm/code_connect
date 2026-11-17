import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders fields, checkbox, forgot password link, and submits form values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    const handleForgotPassword = vi.fn()

    render(
      <LoginForm
        onSubmit={handleSubmit}
        onForgotPasswordClick={handleForgotPassword}
      />,
    )

    const identifierInput = screen.getByLabelText('Email ou usuário')
    const passwordInput = screen.getByLabelText('Senha')
    const rememberCheckbox = screen.getByRole('checkbox', {
      name: 'Lembrar-me',
    })
    const forgotLink = screen.getByRole('link', { name: 'Esqueci a senha' })
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(identifierInput, 'usuario123')
    await user.type(passwordInput, 'segredo123')
    await user.click(rememberCheckbox)
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
      password: 'segredo123',
      rememberMe: true,
    })

    await user.click(forgotLink)
    expect(handleForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('shows validation errors when submitting empty required fields', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<LoginForm onSubmit={handleSubmit} />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Informe seu email ou usuário.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })
})
