import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '../../app/app'

afterEach(() => {
  cleanup()
  localStorage.clear()
  window.location.hash = ''
})

describe('study pages', () => {
  it('keeps ratings hidden until the answer is revealed', async () => {
    window.location.hash = '#/study/review'
    render(<App />)

    const reveal = await screen.findByRole('button', { name: 'Show answer' })
    expect(screen.queryByRole('button', { name: /^Good,/ })).toBeNull()

    fireEvent.click(reveal)

    expect(
      screen.getByRole('button', { name: /^Good, next review/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Read full explanation →' }),
    ).toHaveAttribute('href', expect.stringMatching(/^#\/handbook\//))
  })
})
