import { describe, expect, it } from 'vitest'
import { FsrsStudyScheduler } from './fsrs-scheduler'

describe('FSRS scheduler adapter', () => {
  const now = new Date('2026-09-16T10:00:00.000Z')

  it('previews every rating without mutating the schedule', () => {
    const scheduler = new FsrsStudyScheduler(0.9)
    const schedule = scheduler.createCard(now)
    const snapshot = JSON.stringify(schedule)
    const preview = scheduler.preview(schedule, now)

    expect(Object.keys(preview)).toEqual(['again', 'hard', 'good', 'easy'])
    expect(JSON.stringify(schedule)).toBe(snapshot)
    for (const item of Object.values(preview)) {
      expect(Date.parse(item.due)).toBeGreaterThan(now.getTime())
    }
  })

  it('applies a review and restores serialized state', () => {
    const scheduler = new FsrsStudyScheduler(0.9)
    const schedule = scheduler.createCard(now)
    const reviewed = scheduler.review(schedule, 'good', now)

    expect(reviewed.schedule.reps).toBe(1)
    expect(reviewed.schedule.lastReview).toBe(now.toISOString())
    expect(
      scheduler.preview(reviewed.schedule, new Date('2026-09-16T10:05:00.000Z'))
        .good.due,
    ).toMatch(/^2026-/)
  })
})
