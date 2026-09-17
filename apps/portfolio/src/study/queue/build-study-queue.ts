import type {
  StudyCardDefinition,
  StudyCardProgress,
  StudySettings,
  ReviewHistoryEntry,
  StudyWeekday,
} from '../domain/study'

export interface QueuedStudyCard {
  readonly definition: StudyCardDefinition
  readonly progress?: StudyCardProgress
  readonly isNew: boolean
  readonly overdueMs: number
}

export const estimatedMinutesPerCard = 1.5
export const minimumDurationSamples = 5

export function localCalendarDay(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function interleaveCategories(cards: readonly QueuedStudyCard[]) {
  const output: QueuedStudyCard[] = []
  const remaining = [...cards]
  while (remaining.length) {
    const last = output.at(-1)
    const differentIndex = last
      ? remaining.findIndex(
          (card) => card.definition.category !== last.definition.category,
        )
      : 0
    const index = differentIndex >= 0 ? differentIndex : 0
    output.push(remaining.splice(index, 1)[0] as QueuedStudyCard)
  }
  return output
}

export function limitStudySession(
  queue: readonly QueuedStudyCard[],
  settings: StudySettings,
) {
  const sessionLimit = Math.max(
    1,
    Math.floor((settings.sessionTargetMinutes ?? 20) / estimatedMinutesPerCard),
  )
  return queue.slice(0, sessionLimit)
}

export function estimateStudySessionMinutes(
  cardCount: number,
  reviews: readonly ReviewHistoryEntry[],
) {
  if (cardCount === 0) return 0
  const samples = reviews
    .flatMap((review) =>
      review.responseTimeMs === undefined ? [] : [review.responseTimeMs],
    )
    .slice(-50)
    .sort((left, right) => left - right)
  if (samples.length < minimumDurationSamples)
    return Math.max(1, Math.ceil(cardCount * estimatedMinutesPerCard))

  const middle = Math.floor(samples.length / 2)
  const median =
    samples.length % 2 === 0
      ? ((samples[middle - 1] ?? 0) + (samples[middle] ?? 0)) / 2
      : (samples[middle] ?? 0)
  return Math.max(1, Math.ceil((cardCount * median) / 60_000))
}

export function buildStudyQueue(
  definitions: readonly StudyCardDefinition[],
  progress: Record<string, StudyCardProgress>,
  settings: StudySettings,
  now: Date,
  reviews: readonly ReviewHistoryEntry[] = [],
) {
  const eligible: QueuedStudyCard[] = []
  const newCards: QueuedStudyCard[] = []
  for (const definition of definitions) {
    const cardProgress = progress[definition.id]
    if (!cardProgress) {
      newCards.push({ definition, isNew: true, overdueMs: 0 })
    } else {
      const overdueMs = now.getTime() - Date.parse(cardProgress.schedule.due)
      if (overdueMs >= 0)
        eligible.push({
          definition,
          progress: cardProgress,
          isNew: false,
          overdueMs,
        })
    }
  }

  const priority = { high: 0, normal: 1, low: 2 } as const
  const evidence = { asked: 0, related: 1, none: 2 } as const
  const compareImportance = (left: QueuedStudyCard, right: QueuedStudyCard) =>
    priority[left.definition.priority] - priority[right.definition.priority] ||
    evidence[left.definition.interviewEvidence] -
      evidence[right.definition.interviewEvidence]
  const compareDue = (left: QueuedStudyCard, right: QueuedStudyCard) =>
    right.overdueMs - left.overdueMs ||
    (right.progress?.lapseCount ?? 0) - (left.progress?.lapseCount ?? 0) ||
    compareImportance(left, right) ||
    left.definition.id.localeCompare(right.definition.id)
  const compareNew = (left: QueuedStudyCard, right: QueuedStudyCard) =>
    compareImportance(left, right) ||
    Number(settings.emphasizedCategories.includes(right.definition.category)) -
      Number(
        settings.emphasizedCategories.includes(left.definition.category),
      ) ||
    left.definition.id.localeCompare(right.definition.id)

  eligible.sort(compareDue)
  newCards.sort(compareNew)
  const today = localCalendarDay(now)
  const introducedToday = new Set(
    reviews
      .filter(
        (review) =>
          review.stateBefore === 'new' &&
          localCalendarDay(new Date(review.reviewedAt)) === today,
      )
      .map((review) => review.cardId),
  ).size
  const isAvailableStudyDay = settings.availableStudyDays.includes(
    now.getDay() as StudyWeekday,
  )
  const newCardAllowance = isAvailableStudyDay
    ? Math.max(0, settings.dailyNewCardLimit - introducedToday)
    : 0
  const allowedNewCards = newCards.slice(0, newCardAllowance)
  const combined = [...eligible, ...allowedNewCards]
  if (!settings.interleavingEnabled) return combined

  return [
    ...interleaveCategories(eligible),
    ...interleaveCategories(allowedNewCards),
  ]
}
