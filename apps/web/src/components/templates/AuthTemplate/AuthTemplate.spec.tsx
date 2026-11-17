import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders banner, title, subtitle, children, socialSection, and footer', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner-login.png"
        bannerAlt="Banner de login"
        title="Login"
        subtitle="Boas-vindas! Faça seu login."
        socialSection={<div data-testid="social-slot">Social Slot</div>}
        footer={<div data-testid="footer-slot">Footer Slot</div>}
      >
        <div data-testid="form-slot">Form Content</div>
      </AuthTemplate>,
    )

    const banner = screen.getByRole('img', { name: 'Banner de login' })
    expect(banner).toHaveAttribute('src', '/banner-login.png')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Login' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
    expect(screen.getByTestId('form-slot')).toBeInTheDocument()
    expect(screen.getByTestId('social-slot')).toBeInTheDocument()
    expect(screen.getByTestId('footer-slot')).toBeInTheDocument()
  })

  it('can be reused for registration with different banner and form', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner-cadastro.png"
        bannerAlt="Banner de cadastro"
        title="Cadastro"
        subtitle="Olá! Preencha seus dados."
      >
        <form aria-label="Formulário de cadastro" />
      </AuthTemplate>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'Cadastro' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Olá! Preencha seus dados.')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Banner de cadastro' }),
    ).toHaveAttribute('src', '/banner-cadastro.png')
  })
})
