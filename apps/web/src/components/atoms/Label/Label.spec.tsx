import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders the label text and htmlFor attribute', () => {
    render(<Label htmlFor="email">Email ou usuário</Label>)

    const label = screen.getByText('Email ou usuário')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'email')
  })

  it('merges custom className', () => {
    render(<Label className="mb-2">Senha</Label>)

    expect(screen.getByText('Senha')).toHaveClass('mb-2')
  })
})
