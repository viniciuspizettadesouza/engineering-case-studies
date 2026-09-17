import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { App } from '../../app/app'
import { createEmptyStudyStorage, type StudyStorage } from '../domain/study'
import { STUDY_STORAGE_KEY } from '../storage/browser-study-progress-repository'

function createReviewedStorage(): StudyStorage {
  const reviewedAt = '2026-09-17T10:00:00.000Z'
  const due = '2027-09-18T10:00:00.000Z'
  return {
    ...createEmptyStudyStorage(),
    cards: {
      'javascript-event-loop-microtasks': {
        cardId: 'javascript-event-loop-microtasks',
        reviewCount: 1,
        lapseCount: 0,
        lastRating: 'good',
        lastReviewedAt: reviewedAt,
        schedule: {
          due,
          stability: 1,
          difficulty: 5,
          elapsedDays: 0,
          scheduledDays: 1,
          learningSteps: 0,
          reps: 1,
          lapses: 0,
          state: 'review',
          lastReview: reviewedAt,
        },
      },
    },
    reviews: [
      {
        id: 'review-1',
        cardId: 'javascript-event-loop-microtasks',
        reviewedAt,
        rating: 'good',
        stateBefore: 'new',
        stateAfter: 'review',
        dueAfter: due,
        responseTimeMs: 30_000,
      },
    ],
  }
}

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

    fireEvent.click(screen.getByRole('button', { name: /^Good, next review/ }))
    await screen.findByText('Card 2 of 5')

    const persisted = JSON.parse(
      localStorage.getItem(STUDY_STORAGE_KEY) ?? '{}',
    ) as StudyStorage
    expect(persisted.reviews[0]?.responseTimeMs).toEqual(expect.any(Number))
  })

  it('uses the same configured session size on the dashboard and review page', async () => {
    localStorage.setItem(
      STUDY_STORAGE_KEY,
      JSON.stringify({
        ...createEmptyStudyStorage(),
        settings: {
          ...createEmptyStudyStorage().settings,
          sessionTargetMinutes: 1,
        },
      }),
    )
    window.location.hash = '#/study'
    render(<App />)

    const start = await screen.findByRole('link', {
      name: 'Start review · 1 card',
    })
    expect(
      screen.getByText('New in session').nextElementSibling,
    ).toHaveTextContent('1')

    fireEvent.click(start)
    expect(await screen.findByText('Card 1 of 1')).toBeInTheDocument()
  })

  it('persists available study days and category emphasis', async () => {
    localStorage.setItem(
      STUDY_STORAGE_KEY,
      JSON.stringify(createEmptyStudyStorage()),
    )
    window.location.hash = '#/study/settings'
    render(<App />)

    fireEvent.click(await screen.findByLabelText('Sunday'))
    fireEvent.click(screen.getByLabelText('Systems'))
    fireEvent.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(await screen.findByText('Study settings saved.')).toBeInTheDocument()
    const persisted = JSON.parse(
      localStorage.getItem(STUDY_STORAGE_KEY) ?? '{}',
    ) as StudyStorage
    expect(persisted.settings.availableStudyDays).toEqual([1, 2, 3, 4, 5, 6])
    expect(persisted.settings.emphasizedCategories).toEqual(['Systems'])
  })

  it('shows category analytics, memory labels, and chronological history', async () => {
    localStorage.setItem(
      STUDY_STORAGE_KEY,
      JSON.stringify(createReviewedStorage()),
    )
    window.location.hash = '#/study'
    render(<App />)

    const analyticsHeading = await screen.findByRole('heading', {
      name: 'Reviews by category',
    })
    const analytics = analyticsHeading.closest('section')
    expect(analytics).not.toBeNull()
    expect(
      within(analytics!).getByText('Frontend foundations').nextElementSibling,
    ).toHaveTextContent('1')

    fireEvent.click(screen.getByRole('link', { name: 'Knowledge map' }))
    await screen.findByRole('heading', { name: /Visible memory/ })
    const reviewedRow = screen
      .getByText(/How do microtasks and tasks differ/)
      .closest('tr')
    expect(reviewedRow).not.toBeNull()
    expect(within(reviewedRow!).getByText('review')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'History' }))
    const historyItem = (
      await screen.findByText(/How do microtasks and tasks differ/)
    ).closest('li')
    expect(historyItem).not.toBeNull()
    expect(historyItem).toHaveTextContent(/good.*Next review/i)
  })
})
