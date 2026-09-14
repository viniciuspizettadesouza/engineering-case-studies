import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from './app'

afterEach(() => {
  cleanup()
  window.location.hash = ''
})

describe('handbook pages', () => {
  it('navigates from the homepage to the handbook and searches topics', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: 'Open the handbook' }))

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /practical notes for building/i,
      }),
    ).toBeInTheDocument()

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'event loop' },
    })

    expect(screen.getByText(/topics? found\./)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'JavaScript Foundations' }),
    ).toBeInTheDocument()
  })

  it('renders Markdown, a table of contents, and topic pagination', async () => {
    window.location.hash = '#/handbook/graphql-and-messaging'
    render(<App />)

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'GraphQL and Messaging',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'On this page' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /next: testing, delivery, and devops/i,
      }),
    ).toHaveAttribute('href', '#/handbook/testing-delivery-and-devops')
  })

  it('shows a clear not-found state for an unknown topic', async () => {
    window.location.hash = '#/handbook/unknown-topic'
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Topic not found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Browse the handbook' }),
    ).toHaveAttribute('href', '#/handbook')
  })
})
