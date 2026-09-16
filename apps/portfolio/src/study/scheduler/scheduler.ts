import type {
  MemoryState,
  SerializedSchedule,
  StudyRating,
} from '../domain/study'

export interface RatingPreviewItem {
  readonly rating: StudyRating
  readonly due: string
  readonly state: MemoryState
}

export type RatingPreview = Record<StudyRating, RatingPreviewItem>

export interface ReviewResult {
  readonly schedule: SerializedSchedule
  readonly preview: RatingPreviewItem
}

export interface StudyScheduler {
  createCard(now: Date): SerializedSchedule
  preview(schedule: SerializedSchedule, now: Date): RatingPreview
  review(
    schedule: SerializedSchedule,
    rating: StudyRating,
    now: Date,
  ): ReviewResult
}
