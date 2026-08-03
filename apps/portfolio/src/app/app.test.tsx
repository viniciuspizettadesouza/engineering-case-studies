import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './app'

describe('App', () => {
  it('introduces the project and its planned studies', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /engineering lessons made executable/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /six chapters/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Accessible Transit Platform' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/no employer source code/i)).toBeInTheDocument()
  })
})
