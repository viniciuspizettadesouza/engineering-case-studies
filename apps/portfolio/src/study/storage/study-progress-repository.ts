import type { StudyStorage } from '../domain/study'

export interface StudyProgressRepository {
  load(): Promise<StudyStorage>
  save(storage: StudyStorage): Promise<void>
  clear(): Promise<void>
  export(): Promise<string>
  import(serialized: string): Promise<void>
}
