import { describe, expect, it } from 'vitest'
import { createEmptyStudyStorage } from '../domain/study'
import {
  BrowserStudyProgressRepository,
  LEGACY_STUDY_STORAGE_KEY,
  STUDY_STORAGE_KEY,
  parseStudyStorage,
} from './browser-study-progress-repository'

const legacyStorage = {
  version: 1,
  cards: {},
  reviews: [],
  settings: {
    dailyNewCardLimit: 5,
    desiredRetention: 0.9,
    interleavingEnabled: true,
    sessionTargetMinutes: 20,
  },
}

const validProgress = {
  cardId: 'card-1',
  reviewCount: 1,
  lapseCount: 0,
  lastRating: 'good',
  lastReviewedAt: '2026-09-17T10:00:00.000Z',
  schedule: {
    due: '2026-09-18T10:00:00.000Z',
    stability: 1,
    difficulty: 5,
    elapsedDays: 0,
    scheduledDays: 1,
    learningSteps: 0,
    reps: 1,
    lapses: 0,
    state: 'review',
    lastReview: '2026-09-17T10:00:00.000Z',
  },
} as const

describe('browser study progress repository', () => {
  it('round trips export/import and includes an export date', async () => {
    localStorage.clear()
    const repository = new BrowserStudyProgressRepository(localStorage)
    await repository.save(createEmptyStudyStorage())
    const exported = await repository.export()
    const parsed = JSON.parse(exported) as unknown
    expect((parsed as { exportedAt: unknown }).exportedAt).toBeTypeOf('string')
    await repository.clear()
    await repository.import(exported)
    expect(await repository.load()).toEqual(createEmptyStudyStorage())
  })

  it('recovers from malformed local data without destroying it', async () => {
    localStorage.setItem(STUDY_STORAGE_KEY, '{broken')
    const repository = new BrowserStudyProgressRepository(localStorage)
    expect(await repository.load()).toEqual(createEmptyStudyStorage())
    expect(localStorage.getItem(STUDY_STORAGE_KEY)).toBe('{broken')
  })

  it('rejects incomplete imports before replacement', () => {
    expect(() => parseStudyStorage('{"version":1}')).toThrow(
      /invalid|incomplete/i,
    )
  })

  it('migrates version 1 settings and storage to version 2', async () => {
    localStorage.clear()
    const legacyWithProgress = {
      ...legacyStorage,
      cards: { 'card-1': validProgress },
      reviews: [
        {
          id: 'review-1',
          cardId: 'card-1',
          reviewedAt: '2026-09-17T10:00:00.000Z',
          rating: 'good',
          stateBefore: 'new',
          stateAfter: 'review',
          dueAfter: '2026-09-18T10:00:00.000Z',
          responseTimeMs: 1200,
        },
      ],
    }
    localStorage.setItem(
      LEGACY_STUDY_STORAGE_KEY,
      JSON.stringify(legacyWithProgress),
    )
    const repository = new BrowserStudyProgressRepository(localStorage)

    const migrated = await repository.load()

    expect(migrated.version).toBe(2)
    expect(migrated.cards['card-1']).toEqual(validProgress)
    expect(migrated.reviews).toEqual(legacyWithProgress.reviews)
    expect(migrated.settings).toEqual(createEmptyStudyStorage().settings)
    expect(JSON.parse(localStorage.getItem(STUDY_STORAGE_KEY) ?? '{}')).toEqual(
      migrated,
    )
    expect(localStorage.getItem(LEGACY_STUDY_STORAGE_KEY)).not.toBeNull()
  })

  it.each([
    ['last rating', { lastRating: 'perfect' }],
    ['last review date', { lastReviewedAt: 'not-a-date' }],
  ])('rejects an invalid optional %s', (_label, invalidField) => {
    const storage = {
      ...createEmptyStudyStorage(),
      cards: {
        'card-1': { ...validProgress, ...invalidField },
      },
    }

    expect(() => parseStudyStorage(JSON.stringify(storage))).toThrow(
      /invalid progress/i,
    )
  })

  it('does not replace current progress when an import is invalid', async () => {
    localStorage.clear()
    const repository = new BrowserStudyProgressRepository(localStorage)
    const current = {
      ...createEmptyStudyStorage(),
      settings: {
        ...createEmptyStudyStorage().settings,
        dailyNewCardLimit: 7,
      },
    }
    await repository.save(current)

    await expect(repository.import('{"version":2}')).rejects.toThrow()
    expect(await repository.load()).toEqual(current)
  })

  it.each([
    ['an empty study-day list', { availableStudyDays: [] }],
    ['a duplicate study day', { availableStudyDays: [1, 1] }],
    ['an invalid study day', { availableStudyDays: [7] }],
    ['an invalid category', { emphasizedCategories: ['Unknown'] }],
  ])('rejects settings with %s', (_label, invalidSetting) => {
    const empty = createEmptyStudyStorage()
    const storage = {
      ...empty,
      settings: { ...empty.settings, ...invalidSetting },
    }

    expect(() => parseStudyStorage(JSON.stringify(storage))).toThrow(
      /invalid study backup/i,
    )
  })
})
