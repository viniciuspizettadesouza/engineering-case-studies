import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
} from 'ts-fsrs'
import type {
  MemoryState,
  SerializedSchedule,
  StudyRating,
} from '../domain/study'
import type { RatingPreview, StudyScheduler } from './scheduler'

const ratings: Record<StudyRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
}
const states: Record<MemoryState, State> = {
  new: State.New,
  learning: State.Learning,
  review: State.Review,
  relearning: State.Relearning,
}
const stateNames: Record<State, MemoryState> = {
  [State.New]: 'new',
  [State.Learning]: 'learning',
  [State.Review]: 'review',
  [State.Relearning]: 'relearning',
}

function serialize(card: Card): SerializedSchedule {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: stateNames[card.state],
    ...(card.last_review ? { lastReview: card.last_review.toISOString() } : {}),
  }
}

function restore(schedule: SerializedSchedule): Card {
  return {
    due: new Date(schedule.due),
    stability: schedule.stability,
    difficulty: schedule.difficulty,
    elapsed_days: schedule.elapsedDays,
    scheduled_days: schedule.scheduledDays,
    learning_steps: schedule.learningSteps,
    reps: schedule.reps,
    lapses: schedule.lapses,
    state: states[schedule.state],
    ...(schedule.lastReview
      ? { last_review: new Date(schedule.lastReview) }
      : {}),
  }
}

export class FsrsStudyScheduler implements StudyScheduler {
  private readonly engine

  constructor(desiredRetention = 0.9) {
    this.engine = fsrs(
      generatorParameters({
        request_retention: desiredRetention,
        enable_fuzz: false,
      }),
    )
  }

  createCard(now: Date) {
    return serialize(createEmptyCard(now))
  }

  preview(schedule: SerializedSchedule, now: Date): RatingPreview {
    const result = this.engine.repeat(restore(schedule), now)
    return Object.fromEntries(
      (Object.keys(ratings) as StudyRating[]).map((rating) => {
        const next = result[ratings[rating]].card
        return [
          rating,
          {
            rating,
            due: next.due.toISOString(),
            state: stateNames[next.state],
          },
        ]
      }),
    ) as RatingPreview
  }

  review(schedule: SerializedSchedule, rating: StudyRating, now: Date) {
    const result = this.engine.repeat(restore(schedule), now)[ratings[rating]]
      .card
    return {
      schedule: serialize(result),
      preview: {
        rating,
        due: result.due.toISOString(),
        state: stateNames[result.state],
      },
    }
  }
}
