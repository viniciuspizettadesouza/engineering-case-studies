import { describe, expect, it } from 'vitest'
import type { StudyCardDefinition, StudyCardProgress } from '../domain/study'
import { defaultStudySettings } from '../domain/study'
import {
  buildStudyQueue,
  estimateStudySessionMinutes,
  limitStudySession,
  localCalendarDay,
} from './build-study-queue'

const card = (
  id: string,
  category: StudyCardDefinition['category'],
  priority: StudyCardDefinition['priority'] = 'normal',
): StudyCardDefinition => ({
  id,
  prompt: id,
  answer: id,
  topicSlug: 'javascript',
  category,
  tags: [],
  source: 'interview',
  interviewEvidence: 'asked',
  priority,
  type: 'concept',
})
const progress = (id: string, due: string, lapses = 0): StudyCardProgress => ({
  cardId: id,
  reviewCount: 1,
  lapseCount: lapses,
  schedule: {
    due,
    stability: 1,
    difficulty: 5,
    elapsedDays: 0,
    scheduledDays: 1,
    learningSteps: 0,
    reps: 1,
    lapses,
    state: 'review',
  },
})

describe('study queue', () => {
  const now = new Date('2026-09-16T10:00:00.000Z')
  it('includes all due cards, limits new cards, and excludes future reviews', () => {
    const definitions = [
      card('overdue', 'Systems'),
      card('future', 'Career'),
      card('new-high', 'Practice', 'high'),
      card('new-normal', 'Delivery'),
    ]
    const queue = buildStudyQueue(
      definitions,
      {
        overdue: progress('overdue', '2026-09-14T10:00:00.000Z'),
        future: progress('future', '2026-09-20T10:00:00.000Z'),
      },
      { ...defaultStudySettings, dailyNewCardLimit: 1 },
      now,
    )
    expect(queue.map((item) => item.definition.id)).toEqual([
      'overdue',
      'new-high',
    ])
  })

  it('interleaves categories deterministically without changing due dates', () => {
    const definitions = [
      card('js-1', 'Frontend foundations'),
      card('js-2', 'Frontend foundations'),
      card('systems', 'Systems'),
      card('career', 'Career'),
    ]
    const stored = Object.fromEntries(
      definitions.map((item) => [
        item.id,
        progress(item.id, '2026-09-15T10:00:00.000Z'),
      ]),
    )
    const queue = buildStudyQueue(
      definitions,
      stored,
      defaultStudySettings,
      now,
    )
    expect(queue.map((item) => item.definition.category)).toEqual([
      'Career',
      'Frontend foundations',
      'Systems',
      'Frontend foundations',
    ])
    expect(
      queue.every(
        (item) => item.progress?.schedule.due === '2026-09-15T10:00:00.000Z',
      ),
    ).toBe(true)
  })

  it('keeps every due card ahead of new cards while interleaving each group', () => {
    const definitions = [
      card('due-1', 'Frontend foundations'),
      card('due-2', 'Frontend foundations'),
      card('new-systems', 'Systems'),
      card('new-career', 'Career'),
    ]
    const queue = buildStudyQueue(
      definitions,
      {
        'due-1': progress('due-1', '2026-09-15T08:00:00.000Z'),
        'due-2': progress('due-2', '2026-09-15T09:00:00.000Z'),
      },
      defaultStudySettings,
      now,
    )

    expect(queue.map((item) => item.definition.id)).toEqual([
      'due-1',
      'due-2',
      'new-career',
      'new-systems',
    ])
    expect(queue.slice(0, 2).every((item) => !item.isNew)).toBe(true)
  })

  it('does not replenish the daily new-card budget after a new card is reviewed', () => {
    const definitions = [
      card('reviewed-new', 'Career'),
      card('new-1', 'Systems'),
      card('new-2', 'Delivery'),
    ]
    const stored = {
      'reviewed-new': progress('reviewed-new', '2026-09-17T10:00:00.000Z'),
    }
    const queue = buildStudyQueue(
      definitions,
      stored,
      { ...defaultStudySettings, dailyNewCardLimit: 2 },
      now,
      [
        {
          id: 'review-1',
          cardId: 'reviewed-new',
          reviewedAt: '2026-09-16T09:00:00.000Z',
          rating: 'good',
          stateBefore: 'new',
          stateAfter: 'learning',
          dueAfter: '2026-09-17T10:00:00.000Z',
        },
      ],
    )
    expect(queue.filter((item) => item.isNew)).toHaveLength(1)
  })

  it("resets the new-card allowance on the learner's local calendar day", () => {
    const localNow = new Date(2026, 8, 17, 0, 30)
    const previousLocalDay = new Date(2026, 8, 16, 23, 30)
    const definitions = [
      card('reviewed-yesterday', 'Career'),
      card('new-today', 'Systems'),
    ]
    const queue = buildStudyQueue(
      definitions,
      {
        'reviewed-yesterday': progress(
          'reviewed-yesterday',
          new Date(2026, 8, 18, 10).toISOString(),
        ),
      },
      { ...defaultStudySettings, dailyNewCardLimit: 1 },
      localNow,
      [
        {
          id: 'review-yesterday',
          cardId: 'reviewed-yesterday',
          reviewedAt: previousLocalDay.toISOString(),
          rating: 'good',
          stateBefore: 'new',
          stateAfter: 'learning',
          dueAfter: new Date(2026, 8, 18, 10).toISOString(),
        },
      ],
    )

    expect(localCalendarDay(localNow)).toBe('2026-09-17')
    expect(localCalendarDay(previousLocalDay)).toBe('2026-09-16')
    expect(queue.map((item) => item.definition.id)).toEqual(['new-today'])
  })

  it('limits a session from the configured target without changing the queue', () => {
    const queue = buildStudyQueue(
      [
        card('new-1', 'Career'),
        card('new-2', 'Systems'),
        card('new-3', 'Delivery'),
      ],
      {},
      defaultStudySettings,
      now,
    )

    expect(
      limitStudySession(queue, {
        ...defaultStudySettings,
        sessionTargetMinutes: 3,
      }).map((item) => item.definition.id),
    ).toEqual(['new-1', 'new-2'])
    expect(queue).toHaveLength(3)
  })

  it('keeps due cards visible but introduces no new cards on an unavailable day', () => {
    const queue = buildStudyQueue(
      [card('due', 'Career'), card('new', 'Systems')],
      { due: progress('due', '2026-09-15T10:00:00.000Z') },
      {
        ...defaultStudySettings,
        availableStudyDays: [
          ((now.getDay() + 1) %
            7) as (typeof defaultStudySettings.availableStudyDays)[number],
        ],
      },
      now,
    )

    expect(queue.map((item) => item.definition.id)).toEqual(['due'])
  })

  it('emphasizes categories only when ordering equally important new cards', () => {
    const queue = buildStudyQueue(
      [card('a-career', 'Career'), card('z-systems', 'Systems')],
      {},
      {
        ...defaultStudySettings,
        emphasizedCategories: ['Systems'],
      },
      now,
    )

    expect(queue.map((item) => item.definition.id)).toEqual([
      'z-systems',
      'a-career',
    ])
  })

  it('uses a fallback estimate until enough response-time history exists', () => {
    expect(estimateStudySessionMinutes(4, [])).toBe(6)
    expect(
      estimateStudySessionMinutes(
        4,
        Array.from({ length: 4 }, (_, index) => ({
          id: `review-${index}`,
          cardId: 'card',
          reviewedAt: now.toISOString(),
          rating: 'good' as const,
          stateBefore: 'review' as const,
          stateAfter: 'review' as const,
          dueAfter: now.toISOString(),
          responseTimeMs: 30_000,
        })),
      ),
    ).toBe(6)
  })

  it('uses the median response duration when enough history exists', () => {
    const reviews = [20_000, 30_000, 30_000, 40_000, 300_000].map(
      (responseTimeMs, index) => ({
        id: `review-${index}`,
        cardId: 'card',
        reviewedAt: now.toISOString(),
        rating: 'good' as const,
        stateBefore: 'review' as const,
        stateAfter: 'review' as const,
        dueAfter: now.toISOString(),
        responseTimeMs,
      }),
    )

    expect(estimateStudySessionMinutes(4, reviews)).toBe(2)
  })
})
