import type { HandbookCategory } from '../../content/handbook'

export const studyRatings = ['again', 'hard', 'good', 'easy'] as const
export type StudyRating = (typeof studyRatings)[number]
export type StudySource =
  'interview' | 'handbook' | 'architecture-playbook' | 'project' | 'literature'
export type InterviewEvidence = 'asked' | 'related' | 'none'
export type StudyCardType =
  'concept' | 'code' | 'comparison' | 'scenario' | 'exercise'
export type StudyPriority = 'high' | 'normal' | 'low'
export type MemoryState = 'new' | 'learning' | 'review' | 'relearning'

export interface StudyCardDefinition {
  readonly id: string
  readonly prompt: string
  readonly answer: string
  readonly topicSlug: string
  readonly headingId?: string
  readonly category: HandbookCategory
  readonly tags: readonly string[]
  readonly source: StudySource
  readonly interviewEvidence: InterviewEvidence
  readonly priority: StudyPriority
  readonly type: StudyCardType
}

export interface SerializedSchedule {
  readonly due: string
  readonly stability: number
  readonly difficulty: number
  readonly elapsedDays: number
  readonly scheduledDays: number
  readonly learningSteps: number
  readonly reps: number
  readonly lapses: number
  readonly state: MemoryState
  readonly lastReview?: string
}

export interface StudyCardProgress {
  readonly cardId: string
  readonly schedule: SerializedSchedule
  readonly reviewCount: number
  readonly lapseCount: number
  readonly lastRating?: StudyRating
  readonly lastReviewedAt?: string
}

export interface ReviewHistoryEntry {
  readonly id: string
  readonly cardId: string
  readonly reviewedAt: string
  readonly rating: StudyRating
  readonly stateBefore: MemoryState
  readonly stateAfter: MemoryState
  readonly dueBefore?: string
  readonly dueAfter: string
  readonly responseTimeMs?: number
}

export interface StudySettings {
  readonly dailyNewCardLimit: number
  readonly desiredRetention: number
  readonly interleavingEnabled: boolean
  readonly sessionTargetMinutes?: number
}

export interface StudyStorage {
  readonly version: 1
  readonly cards: Record<string, StudyCardProgress>
  readonly reviews: ReviewHistoryEntry[]
  readonly settings: StudySettings
}

export const defaultStudySettings: StudySettings = {
  dailyNewCardLimit: 5,
  desiredRetention: 0.9,
  interleavingEnabled: true,
  sessionTargetMinutes: 20,
}

export function createEmptyStudyStorage(): StudyStorage {
  return { version: 1, cards: {}, reviews: [], settings: defaultStudySettings }
}

export interface Clock {
  now(): Date
}

export const systemClock: Clock = { now: () => new Date() }

export function validateStudySettings(value: unknown): value is StudySettings {
  if (!value || typeof value !== 'object') return false
  const settings = value as Partial<StudySettings>
  return (
    Number.isInteger(settings.dailyNewCardLimit) &&
    (settings.dailyNewCardLimit ?? -1) >= 0 &&
    (settings.dailyNewCardLimit ?? 101) <= 100 &&
    typeof settings.desiredRetention === 'number' &&
    settings.desiredRetention >= 0.7 &&
    settings.desiredRetention <= 0.99 &&
    typeof settings.interleavingEnabled === 'boolean' &&
    (settings.sessionTargetMinutes === undefined ||
      (Number.isInteger(settings.sessionTargetMinutes) &&
        settings.sessionTargetMinutes >= 1 &&
        settings.sessionTargetMinutes <= 240))
  )
}
