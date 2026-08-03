import type {
  JourneySearchValues,
  PassengerDetails,
  Ticket,
} from '../domain/ticketing'
import { isJourneySearchValues, isPassengerDetails } from '../domain/ticketing'

export interface TransitDraft {
  readonly search?: JourneySearchValues
  readonly journeyId?: string
  readonly fareId?: string
  readonly passenger?: PassengerDetails
}

const draftPrefix = 'engineering-case-studies.transit-draft.v1.'
const ticketsKey = 'engineering-case-studies.transit-tickets.v1'

export function readTransitDraft(
  storage: Storage,
  tenantId: string,
): TransitDraft {
  const stored = storage.getItem(`${draftPrefix}${tenantId}`)
  if (!stored) return {}
  try {
    const parsed = JSON.parse(stored) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const candidate = parsed as Record<string, unknown>
    return {
      ...(isJourneySearchValues(candidate.search)
        ? { search: candidate.search }
        : {}),
      ...(typeof candidate.journeyId === 'string'
        ? { journeyId: candidate.journeyId }
        : {}),
      ...(typeof candidate.fareId === 'string'
        ? { fareId: candidate.fareId }
        : {}),
      ...(isPassengerDetails(candidate.passenger)
        ? { passenger: candidate.passenger }
        : {}),
    }
  } catch {
    return {}
  }
}

export function updateTransitDraft(
  storage: Storage,
  tenantId: string,
  update: Partial<TransitDraft>,
): void {
  const current = readTransitDraft(storage, tenantId)
  storage.setItem(
    `${draftPrefix}${tenantId}`,
    JSON.stringify({ ...current, ...update }),
  )
}

export function clearTransitDraft(storage: Storage, tenantId: string): void {
  storage.removeItem(`${draftPrefix}${tenantId}`)
}

export function saveTicket(storage: Storage, ticket: Ticket): void {
  const tickets = readTickets(storage).filter(({ id }) => id !== ticket.id)
  storage.setItem(ticketsKey, JSON.stringify([...tickets, ticket]))
}

export function findTicket(storage: Storage, id: string): Ticket | undefined {
  return readTickets(storage).find((ticket) => ticket.id === id)
}

function readTickets(storage: Storage): readonly Ticket[] {
  const stored = storage.getItem(ticketsKey)
  if (!stored) return []
  try {
    return JSON.parse(stored) as Ticket[]
  } catch {
    return []
  }
}
