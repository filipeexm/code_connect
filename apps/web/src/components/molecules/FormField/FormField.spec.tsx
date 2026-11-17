import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('associates label with input and handles user typing', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <FormField
        id="user-identifier"
        label="Email ou usuário"
        placeholder="usuario123"
        onChange={handleChange}
      />,
    )

    const input = screen.getByLabelText('Email ou usuário')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'usuario123')

    await user.type(input, 'dev@codeconnect.com')
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('dev@codeconnect.com')
  })

  it('displays validation error message when error prop is provided', () => {
    render(
      <FormField
        id="password"
        label="Senha"
        type="password"
        error="Campo obrigatório"
      />,
    )

    const input = screen.getByLabelText('Senha')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório')
  })
})
