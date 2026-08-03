import { beforeEach, describe, expect, it } from 'vitest'
import type { ReservationFormValues } from '../domain/reservation'
import {
  clearReservationDraft,
  findReservation,
  readReservationDraft,
  saveReservation,
  saveReservationDraft,
} from './reservation-repository'

const draft: ReservationFormValues = {
  startDate: '2027-06-16',
  endDate: '2027-06-19',
  pickupLocation: 'Northbridge',
  fullName: 'Fictional Buyer',
  email: 'buyer@example.test',
  phone: '0000000000',
  fictionalDataConfirmed: true,
}

describe('reservation repository', () => {
  beforeEach(() => window.localStorage.clear())

  it('keeps drafts separate by vehicle and clears only the submitted draft', () => {
    saveReservationDraft(window.localStorage, 'aurora-compact', draft)
    saveReservationDraft(window.localStorage, 'bramble-four', {
      ...draft,
      fullName: 'Another Buyer',
    })

    clearReservationDraft(window.localStorage, 'aurora-compact')

    expect(
      readReservationDraft(window.localStorage, 'aurora-compact'),
    ).toBeUndefined()
    expect(
      readReservationDraft(window.localStorage, 'bramble-four'),
    ).toMatchObject({ fullName: 'Another Buyer' })
  })

  it('stores a simulated confirmation locally', () => {
    const reservation = {
      ...draft,
      id: 'WR-TEST',
      vehicleId: 'aurora-compact',
      submittedAt: '2026-08-03T10:00:00.000Z',
      totalPrice: 246,
    }
    saveReservation(window.localStorage, reservation)

    expect(findReservation(window.localStorage, 'WR-TEST')).toEqual(reservation)
  })

  it('recovers from malformed browser storage', () => {
    window.localStorage.setItem(
      'engineering-case-studies.vehicle-reservation-draft.v1.aurora-compact',
      '{broken',
    )

    expect(
      readReservationDraft(window.localStorage, 'aurora-compact'),
    ).toBeUndefined()
  })
})
