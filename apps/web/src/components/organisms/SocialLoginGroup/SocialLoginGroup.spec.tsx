import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLoginGroup } from './SocialLoginGroup'

describe('SocialLoginGroup', () => {
  it('renders default divider text and Github & Gmail social buttons', async () => {
    const user = userEvent.setup()
    const handleProviderClick = vi.fn()

    render(<SocialLoginGroup onProviderClick={handleProviderClick} />)

    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()

    const githubImg = screen.getByRole('img', { name: 'Github' })
    const gmailImg = screen.getByRole('img', { name: 'Gmail' })

    expect(githubImg).toHaveAttribute('src', '/github.png')
    expect(gmailImg).toHaveAttribute('src', '/gmail.png')

    await user.click(screen.getByRole('button', { name: /github/i }))
    expect(handleProviderClick).toHaveBeenCalledWith('github')

    await user.click(screen.getByRole('button', { name: /gmail/i }))
    expect(handleProviderClick).toHaveBeenCalledWith('gmail')
  })
})
