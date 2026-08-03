import type { CreditApplication } from '../domain/application'

const applicationsKey = 'engineering-case-studies.credit-applications.v1'
const personalDraftKey = 'engineering-case-studies.credit-application-draft.v1'

export interface ApplicationRepository {
  list(): readonly CreditApplication[]
  find(id: string): CreditApplication | undefined
  save(application: CreditApplication): void
}

export class BrowserApplicationRepository implements ApplicationRepository {
  constructor(private readonly storage: Storage) {}

  list(): readonly CreditApplication[] {
    const stored = this.storage.getItem(applicationsKey)

    if (!stored) return []

    try {
      const applications = JSON.parse(stored) as CreditApplication[]
      return [...applications].sort((left, right) =>
        right.submittedAt.localeCompare(left.submittedAt),
      )
    } catch {
      return []
    }
  }

  find(id: string): CreditApplication | undefined {
    return this.list().find((application) => application.id === id)
  }

  save(application: CreditApplication): void {
    const applications = this.list().filter(
      (existing) => existing.id !== application.id,
    )
    this.storage.setItem(
      applicationsKey,
      JSON.stringify([...applications, application]),
    )
  }
}

export function readPersonalDraft(storage: Storage): unknown {
  const stored = storage.getItem(personalDraftKey)

  if (!stored) return undefined

  try {
    return JSON.parse(stored)
  } catch {
    return undefined
  }
}

export function savePersonalDraft(storage: Storage, draft: unknown): void {
  storage.setItem(personalDraftKey, JSON.stringify(draft))
}

export function clearPersonalDraft(storage: Storage): void {
  storage.removeItem(personalDraftKey)
}
