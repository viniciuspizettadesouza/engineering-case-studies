import { describe, expect, it } from 'vitest'
import type { StudyCardDefinition, StudyCardProgress } from '../domain/study'
import { defaultStudySettings } from '../domain/study'
import { buildStudyQueue } from './build-study-queue'

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
})
