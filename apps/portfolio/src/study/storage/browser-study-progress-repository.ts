import {
  createEmptyStudyStorage,
  defaultStudySettings,
  studyRatings,
  validateStudySettings,
  type MemoryState,
  type StudySettings,
  type StudyStorage,
} from '../domain/study'
import type { StudyProgressRepository } from './study-progress-repository'

export const STUDY_STORAGE_KEY = 'engineering-practice-lab.study.v2'
export const LEGACY_STUDY_STORAGE_KEY = 'engineering-practice-lab.study.v1'
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

function isNonNegativeInteger(value: unknown) {
  return Number.isInteger(value) && (value as number) >= 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

type LegacyStudySettings = Omit<
  StudySettings,
  'availableStudyDays' | 'emphasizedCategories'
>

function validateLegacyStudySettings(
  value: unknown,
): value is LegacyStudySettings {
  if (!isRecord(value)) return false
  return validateStudySettings({
    ...value,
    availableStudyDays: defaultStudySettings.availableStudyDays,
    emphasizedCategories: defaultStudySettings.emphasizedCategories,
  })
}

function migrateSettings(settings: LegacyStudySettings): StudySettings {
  return {
    ...settings,
    availableStudyDays: defaultStudySettings.availableStudyDays,
    emphasizedCategories: defaultStudySettings.emphasizedCategories,
  }
}

export function parseStudyStorage(serialized: string): StudyStorage {
  const data: unknown = JSON.parse(serialized)
  if (!isRecord(data)) throw new Error('Backup must be a JSON object.')
  if (data.version !== 1 && data.version !== 2)
    throw new Error('Unsupported or invalid study backup.')
  const settings =
    data.version === 1 && validateLegacyStudySettings(data.settings)
      ? migrateSettings(data.settings)
      : data.version === 2 && validateStudySettings(data.settings)
        ? data.settings
        : undefined
  if (!settings) throw new Error('Unsupported or invalid study backup.')
  if (!isRecord(data.cards) || !Array.isArray(data.reviews))
    throw new Error('Study progress is incomplete.')

  const cards = data.cards as unknown as StudyStorage['cards']
  for (const [id, progress] of Object.entries(cards)) {
    if (
      !progress ||
      !id ||
      progress.cardId !== id ||
      !progress.schedule ||
      !isDate(progress.schedule.due) ||
      !memoryStates.includes(progress.schedule.state) ||
      !isNonNegativeInteger(progress.reviewCount) ||
      !isNonNegativeInteger(progress.lapseCount) ||
      !isNonNegativeNumber(progress.schedule.stability) ||
      !isNonNegativeNumber(progress.schedule.difficulty) ||
      !isNonNegativeInteger(progress.schedule.elapsedDays) ||
      !isNonNegativeInteger(progress.schedule.scheduledDays) ||
      !isNonNegativeInteger(progress.schedule.learningSteps) ||
      !isNonNegativeInteger(progress.schedule.reps) ||
      !isNonNegativeInteger(progress.schedule.lapses) ||
      (progress.schedule.lastReview !== undefined &&
        !isDate(progress.schedule.lastReview)) ||
      (progress.lastRating !== undefined &&
        !studyRatings.includes(progress.lastRating)) ||
      (progress.lastReviewedAt !== undefined &&
        !isDate(progress.lastReviewedAt))
    )
      throw new Error(`Invalid progress for card ${id}.`)
  }
  const reviews = data.reviews as unknown as StudyStorage['reviews']
  for (const review of reviews) {
    if (
      !review ||
      typeof review.id !== 'string' ||
      !review.id ||
      typeof review.cardId !== 'string' ||
      !review.cardId ||
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
    version: 2,
    cards,
    reviews,
    settings,
  }
}

export class BrowserStudyProgressRepository implements StudyProgressRepository {
  constructor(private readonly storage: Storage) {}

  async load(): Promise<StudyStorage> {
    const serialized = this.storage.getItem(STUDY_STORAGE_KEY)
    if (serialized) {
      try {
        return parseStudyStorage(serialized)
      } catch {
        return createEmptyStudyStorage()
      }
    }
    const legacy = this.storage.getItem(LEGACY_STUDY_STORAGE_KEY)
    if (legacy) {
      try {
        const migrated = parseStudyStorage(legacy)
        await this.save(migrated)
        return migrated
      } catch {
        return createEmptyStudyStorage()
      }
    }
    return createEmptyStudyStorage()
  }

  save(storage: StudyStorage): Promise<void> {
    this.storage.setItem(STUDY_STORAGE_KEY, JSON.stringify(storage))
    return Promise.resolve()
  }

  clear(): Promise<void> {
    this.storage.removeItem(STUDY_STORAGE_KEY)
    this.storage.removeItem(LEGACY_STUDY_STORAGE_KEY)
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
