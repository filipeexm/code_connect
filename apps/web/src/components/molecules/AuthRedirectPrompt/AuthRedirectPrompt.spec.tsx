import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AuthRedirectPrompt } from './AuthRedirectPrompt'

describe('AuthRedirectPrompt', () => {
  it('renders prompt text and action link, and calls onActionClick when clicked', async () => {
    const user = userEvent.setup()
    const handleActionClick = vi.fn()

    render(
      <AuthRedirectPrompt
        promptText="Ainda não tem conta?"
        actionText="Crie seu cadastro!"
        onActionClick={handleActionClick}
      />,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /crie seu cadastro!/i })
    expect(link).toBeInTheDocument()

    await user.click(link)
    expect(handleActionClick).toHaveBeenCalledTimes(1)
  })
})
