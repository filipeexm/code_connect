import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children and optional icon, and triggers onClick', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button onClick={handleClick} icon={<span data-testid="icon">→</span>}>
        Login
      </Button>,
    )

    const button = screen.getByRole('button', { name: /login/i })
    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('supports outline variant and disabled state', () => {
    render(
      <Button variant="outline" fullWidth={false} disabled>
        Cancelar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Cancelar' })
    expect(button).toBeDisabled()
    expect(button).not.toHaveClass('w-full')
  })
})
