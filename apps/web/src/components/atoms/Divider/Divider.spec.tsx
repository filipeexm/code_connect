import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders divider with text when provided', () => {
    render(<Divider text="ou entre com outras contas" />)

    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('renders plain hr when text is omitted', () => {
    render(<Divider />)

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
