import {
  createEmptyStudyStorage,
  studyRatings,
  validateStudySettings,
  type MemoryState,
  type StudyStorage,
} from '../domain/study'
import type { StudyProgressRepository } from './study-progress-repository'

export const STUDY_STORAGE_KEY = 'engineering-practice-lab.study.v1'
const memoryStates: readonly MemoryState[] = [
  'new',
  'learning',
  'review',
  'relearning',
]

function isDate(value: unknown) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isNonNegativeNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

export function parseStudyStorage(serialized: string): StudyStorage {
  const data: unknown = JSON.parse(serialized)
  if (!data || typeof data !== 'object')
    throw new Error('Backup must be a JSON object.')
  const candidate = data as Partial<StudyStorage>
  if (candidate.version !== 1 || !validateStudySettings(candidate.settings))
    throw new Error('Unsupported or invalid study backup.')
  if (
    !candidate.cards ||
    typeof candidate.cards !== 'object' ||
    !Array.isArray(candidate.reviews)
  )
    throw new Error('Study progress is incomplete.')

  for (const [id, progress] of Object.entries(candidate.cards)) {
    if (
      !progress ||
      progress.cardId !== id ||
      !progress.schedule ||
      !isDate(progress.schedule.due) ||
      !memoryStates.includes(progress.schedule.state) ||
      !isNonNegativeNumber(progress.reviewCount) ||
      !isNonNegativeNumber(progress.lapseCount) ||
      !isNonNegativeNumber(progress.schedule.stability) ||
      !isNonNegativeNumber(progress.schedule.difficulty) ||
      !isNonNegativeNumber(progress.schedule.elapsedDays) ||
      !isNonNegativeNumber(progress.schedule.scheduledDays) ||
      !isNonNegativeNumber(progress.schedule.learningSteps) ||
      !isNonNegativeNumber(progress.schedule.reps) ||
      !isNonNegativeNumber(progress.schedule.lapses) ||
      (progress.schedule.lastReview !== undefined &&
        !isDate(progress.schedule.lastReview))
    )
      throw new Error(`Invalid progress for card ${id}.`)
  }
  for (const review of candidate.reviews) {
    if (
      !review ||
      typeof review.id !== 'string' ||
      typeof review.cardId !== 'string' ||
      !isDate(review.reviewedAt) ||
      !isDate(review.dueAfter) ||
      !studyRatings.includes(review.rating) ||
      !memoryStates.includes(review.stateBefore) ||
      !memoryStates.includes(review.stateAfter) ||
      (review.dueBefore !== undefined && !isDate(review.dueBefore)) ||
      (review.responseTimeMs !== undefined &&
        !isNonNegativeNumber(review.responseTimeMs))
    )
      throw new Error('Invalid review history.')
  }
  return {
    version: 1,
    cards: candidate.cards,
    reviews: candidate.reviews,
    settings: candidate.settings,
  }
}

export class BrowserStudyProgressRepository implements StudyProgressRepository {
  constructor(private readonly storage: Storage) {}

  load(): Promise<StudyStorage> {
    const serialized = this.storage.getItem(STUDY_STORAGE_KEY)
    if (!serialized) return Promise.resolve(createEmptyStudyStorage())
    try {
      return Promise.resolve(parseStudyStorage(serialized))
    } catch {
      return Promise.resolve(createEmptyStudyStorage())
    }
  }

  save(storage: StudyStorage): Promise<void> {
    this.storage.setItem(STUDY_STORAGE_KEY, JSON.stringify(storage))
    return Promise.resolve()
  }

  clear(): Promise<void> {
    this.storage.removeItem(STUDY_STORAGE_KEY)
    return Promise.resolve()
  }

  async export() {
    const storage = await this.load()
    return JSON.stringify(
      { ...storage, exportedAt: new Date().toISOString() },
      null,
      2,
    )
  }

  async import(serialized: string) {
    const storage = parseStudyStorage(serialized)
    await this.save(storage)
  }
}
