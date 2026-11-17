import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders with placeholder and handles typing', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Input
        placeholder="usuario123"
        aria-label="Email ou usuário"
        onChange={handleChange}
      />,
    )

    const input = screen.getByPlaceholderText('usuario123')
    expect(input).toBeInTheDocument()

    await user.type(input, 'luiz')
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('luiz')
  })

  it('supports password type and disabled state', () => {
    render(<Input type="password" placeholder="******" disabled />)

    const input = screen.getByPlaceholderText('******')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeDisabled()
  })
})
