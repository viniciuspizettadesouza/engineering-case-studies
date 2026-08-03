import type { Reservation, ReservationFormValues } from '../domain/reservation'

const draftKeyPrefix = 'engineering-case-studies.vehicle-reservation-draft.v1.'
const reservationsKey = 'engineering-case-studies.vehicle-reservations.v1'

export function readReservationDraft(
  storage: Storage,
  vehicleId: string,
): unknown {
  const stored = storage.getItem(`${draftKeyPrefix}${vehicleId}`)
  if (!stored) return undefined

  try {
    return JSON.parse(stored) as unknown
  } catch {
    return undefined
  }
}

export function saveReservationDraft(
  storage: Storage,
  vehicleId: string,
  draft: ReservationFormValues,
): void {
  storage.setItem(`${draftKeyPrefix}${vehicleId}`, JSON.stringify(draft))
}

export function clearReservationDraft(
  storage: Storage,
  vehicleId: string,
): void {
  storage.removeItem(`${draftKeyPrefix}${vehicleId}`)
}

export function saveReservation(
  storage: Storage,
  reservation: Reservation,
): void {
  const reservations = readReservations(storage).filter(
    ({ id }) => id !== reservation.id,
  )
  storage.setItem(
    reservationsKey,
    JSON.stringify([...reservations, reservation]),
  )
}

export function findReservation(
  storage: Storage,
  id: string,
): Reservation | undefined {
  return readReservations(storage).find((reservation) => reservation.id === id)
}

function readReservations(storage: Storage): readonly Reservation[] {
  const stored = storage.getItem(reservationsKey)
  if (!stored) return []

  try {
    return JSON.parse(stored) as Reservation[]
  } catch {
    return []
  }
}
