import { createContext, useContext } from 'react'
import type { buildStudyQueue } from './queue/build-study-queue'
import type { StudyRating, StudySettings, StudyStorage } from './domain/study'

export interface StudyContextValue {
  readonly storage: StudyStorage
  readonly ready: boolean
  readonly queue: ReturnType<typeof buildStudyQueue>
  readonly review: (
    cardId: string,
    rating: StudyRating,
    responseTimeMs?: number,
  ) => Promise<void>
  readonly updateSettings: (settings: StudySettings) => Promise<void>
  readonly exportProgress: () => Promise<string>
  readonly importProgress: (serialized: string) => Promise<void>
  readonly resetProgress: () => Promise<void>
}

export const StudyContext = createContext<StudyContextValue | undefined>(
  undefined,
)

export function useStudy() {
  const value = useContext(StudyContext)
  if (!value) throw new Error('useStudy must be used inside StudyProvider')
  return value
}
