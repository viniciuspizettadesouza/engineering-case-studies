import type { ProductRow, Publication } from '../domain/catalogue'

const draftPrefix = 'engineering-case-studies.catalogue-draft.v1.'
const publicationPrefix = 'engineering-case-studies.catalogue-publications.v1.'

export function readCatalogueDraft(
  storage: Storage,
  tenantId: string,
): readonly ProductRow[] {
  const stored = storage.getItem(`${draftPrefix}${tenantId}`)
  if (!stored) return []
  try {
    const parsed = JSON.parse(stored) as unknown
    return Array.isArray(parsed) ? (parsed as ProductRow[]) : []
  } catch {
    return []
  }
}

export function saveCatalogueDraft(
  storage: Storage,
  tenantId: string,
  rows: readonly ProductRow[],
): void {
  storage.setItem(`${draftPrefix}${tenantId}`, JSON.stringify(rows))
}

export function savePublication(
  storage: Storage,
  publication: Publication,
): void {
  const key = `${publicationPrefix}${publication.tenantId}`
  const current = readPublications(storage, publication.tenantId)
  storage.setItem(key, JSON.stringify([...current, publication]))
}

export function readPublications(
  storage: Storage,
  tenantId: string,
): readonly Publication[] {
  const stored = storage.getItem(`${publicationPrefix}${tenantId}`)
  if (!stored) return []
  try {
    const parsed = JSON.parse(stored) as unknown
    return Array.isArray(parsed) ? (parsed as Publication[]) : []
  } catch {
    return []
  }
}
