import type {
  StudyCardDefinition,
  StudyCardProgress,
  StudySettings,
  ReviewHistoryEntry,
} from '../domain/study'

export interface QueuedStudyCard {
  readonly definition: StudyCardDefinition
  readonly progress?: StudyCardProgress
  readonly isNew: boolean
  readonly overdueMs: number
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
  const compare = (left: QueuedStudyCard, right: QueuedStudyCard) =>
    right.overdueMs - left.overdueMs ||
    (right.progress?.lapseCount ?? 0) - (left.progress?.lapseCount ?? 0) ||
    priority[left.definition.priority] - priority[right.definition.priority] ||
    evidence[left.definition.interviewEvidence] -
      evidence[right.definition.interviewEvidence] ||
    left.definition.id.localeCompare(right.definition.id)

  eligible.sort(compare)
  newCards.sort(compare)
  const today = now.toISOString().slice(0, 10)
  const introducedToday = new Set(
    reviews
      .filter(
        (review) =>
          review.stateBefore === 'new' &&
          review.reviewedAt.slice(0, 10) === today,
      )
      .map((review) => review.cardId),
  ).size
  const newCardAllowance = Math.max(
    0,
    settings.dailyNewCardLimit - introducedToday,
  )
  const combined = [...eligible, ...newCards.slice(0, newCardAllowance)]
  if (!settings.interleavingEnabled) return combined

  const output: QueuedStudyCard[] = []
  const remaining = [...combined]
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
