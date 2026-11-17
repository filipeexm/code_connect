import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialButton } from './SocialButton'

describe('SocialButton', () => {
  it('renders icon image, label text, and triggers onClick', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <SocialButton
        label="Github"
        iconSrc="/github.png"
        onClick={handleClick}
      />,
    )

    const button = screen.getByRole('button', { name: /github/i })
    const img = screen.getByRole('img', { name: 'Github' })

    expect(button).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/github.png')

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
