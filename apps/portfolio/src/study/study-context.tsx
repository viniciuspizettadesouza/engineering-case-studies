import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { studyCards } from './cards/study-cards'
import {
  createEmptyStudyStorage,
  systemClock,
  type StudyRating,
  type StudySettings,
  type StudyStorage,
} from './domain/study'
import { buildStudyQueue } from './queue/build-study-queue'
import { FsrsStudyScheduler } from './scheduler/fsrs-scheduler'
import { BrowserStudyProgressRepository } from './storage/browser-study-progress-repository'
import { StudyContext } from './use-study'

function uniqueReviewId(cardId: string, reviewedAt: string) {
  return `${cardId}-${reviewedAt}-${Math.random().toString(36).slice(2, 8)}`
}

export function StudyProvider({ children }: { readonly children: ReactNode }) {
  const [storage, setStorage] = useState<StudyStorage>(createEmptyStudyStorage)
  const [ready, setReady] = useState(false)
  const repository = useMemo(
    () => new BrowserStudyProgressRepository(window.localStorage),
    [],
  )

  useEffect(() => {
    void repository.load().then((loaded) => {
      setStorage(loaded)
      setReady(true)
    })
  }, [repository])

  const persist = useCallback(
    async (next: StudyStorage) => {
      await repository.save(next)
      setStorage(next)
    },
    [repository],
  )

  const review = useCallback(
    async (cardId: string, rating: StudyRating, responseTimeMs?: number) => {
      const now = systemClock.now()
      const scheduler = new FsrsStudyScheduler(
        storage.settings.desiredRetention,
      )
      const previous = storage.cards[cardId]
      const before = previous?.schedule ?? scheduler.createCard(now)
      const result = scheduler.review(before, rating, now)
      const reviewedAt = now.toISOString()
      const next: StudyStorage = {
        ...storage,
        cards: {
          ...storage.cards,
          [cardId]: {
            cardId,
            schedule: result.schedule,
            reviewCount: (previous?.reviewCount ?? 0) + 1,
            lapseCount:
              (previous?.lapseCount ?? 0) + (rating === 'again' ? 1 : 0),
            lastRating: rating,
            lastReviewedAt: reviewedAt,
          },
        },
        reviews: [
          ...storage.reviews,
          {
            id: uniqueReviewId(cardId, reviewedAt),
            cardId,
            reviewedAt,
            rating,
            stateBefore: before.state,
            stateAfter: result.schedule.state,
            dueBefore: before.due,
            dueAfter: result.schedule.due,
            ...(responseTimeMs === undefined ? {} : { responseTimeMs }),
          },
        ],
      }
      await persist(next)
    },
    [persist, storage],
  )

  const updateSettings = useCallback(
    async (settings: StudySettings) => persist({ ...storage, settings }),
    [persist, storage],
  )
  const importProgress = useCallback(
    async (serialized: string) => {
      await repository.import(serialized)
      setStorage(await repository.load())
    },
    [repository],
  )
  const resetProgress = useCallback(async () => {
    await repository.clear()
    setStorage(createEmptyStudyStorage())
  }, [repository])

  const queue = useMemo(
    () =>
      buildStudyQueue(
        studyCards,
        storage.cards,
        storage.settings,
        systemClock.now(),
        storage.reviews,
      ),
    [storage],
  )

  return (
    <StudyContext.Provider
      value={{
        storage,
        ready,
        queue,
        review,
        updateSettings,
        exportProgress: () => repository.export(),
        importProgress,
        resetProgress,
      }}
    >
      {children}
    </StudyContext.Provider>
  )
}
