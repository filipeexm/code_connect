import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('renders login banner, form, social logins, and registration redirect', async () => {
    const user = userEvent.setup()
    const handleLoginSubmit = vi.fn()
    const handleSocialLogin = vi.fn()
    const handleNavigateToRegister = vi.fn()

    render(
      <LoginPage
        onLoginSubmit={handleLoginSubmit}
        onSocialLogin={handleSocialLogin}
        onNavigateToRegister={handleNavigateToRegister}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'Login' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()

    const banner = screen.getByRole('img', {
      name: /pessoa programadora utilizando um notebook no code connect/i,
    })
    expect(banner).toHaveAttribute('src', '/banner-login.png')

    expect(screen.getByRole('img', { name: 'Github' })).toHaveAttribute(
      'src',
      '/github.png',
    )
    expect(screen.getByRole('img', { name: 'Gmail' })).toHaveAttribute(
      'src',
      '/gmail.png',
    )

    await user.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.click(screen.getByRole('button', { name: /^login$/i }))

    expect(handleLoginSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
      password: '123456',
      rememberMe: false,
    })

    await user.click(screen.getByRole('button', { name: /github/i }))
    expect(handleSocialLogin).toHaveBeenCalledWith('github')

    await user.click(screen.getByRole('link', { name: /crie seu cadastro!/i }))
    expect(handleNavigateToRegister).toHaveBeenCalledTimes(1)
  })
})
