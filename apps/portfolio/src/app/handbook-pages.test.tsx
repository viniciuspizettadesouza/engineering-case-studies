import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
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
      await screen.findByRole(
        'heading',
        {
          level: 1,
          name: 'GraphQL and Messaging',
        },
        { timeout: 3000 },
      ),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('table')).toHaveLength(2)
    expect(
      screen.getByRole('navigation', { name: 'On this page' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /next: testing, delivery, and devops/i,
      }),
    ).toHaveAttribute('href', '#/handbook/testing-delivery-and-devops')
  })

  it('scrolls to a handbook section opened through a deep link', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    window.location.hash = '#/handbook/javascript#asynchronous-execution'
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Asynchronous execution' }),
    ).toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' })
  })

  it('renders and deep-links to the scaling guide from its table of contents', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    window.location.hash =
      '#/handbook/architecture-and-patterns#scaling-from-observed-bottlenecks'
    render(<App />)

    expect(
      await screen.findByRole(
        'heading',
        {
          name: 'Scaling from observed bottlenecks',
        },
        { timeout: 3000 },
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Scaling from observed bottlenecks',
      }),
    ).toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'start' })
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
