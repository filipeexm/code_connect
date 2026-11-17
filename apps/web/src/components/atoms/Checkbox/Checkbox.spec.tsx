import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label and toggles checked state', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Checkbox id="remember" label="Lembrar-me" onChange={handleChange} />,
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Lembrar-me' })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
