import { describe, expect, it } from 'vitest'
import { vehicles } from '../fixtures/vehicles'
import {
  createReservation,
  filterVehicles,
  InMemoryAnalyticsRecorder,
  isVehicleAvailable,
  reservationDays,
  validateReservation,
  type ReservationFormValues,
} from './reservation'

const vehicle = vehicles[0]!
const validValues: ReservationFormValues = {
  startDate: '2027-06-16',
  endDate: '2027-06-19',
  pickupLocation: vehicle.location,
  fullName: 'Fictional Buyer',
  email: 'buyer@example.test',
  phone: '0000000000',
  fictionalDataConfirmed: true,
}

describe('vehicle catalogue', () => {
  it('combines location, sleeping capacity and price filters', () => {
    const results = filterVehicles(vehicles, {
      location: 'Northbridge',
      sleeps: '4',
      maxPrice: '130',
    })

    expect(results.map(({ id }) => id)).toEqual(['bramble-four'])
  })

  it('returns no results for an impossible filter combination', () => {
    expect(
      filterVehicles(vehicles, {
        location: 'Northbridge',
        sleeps: '6',
        maxPrice: '90',
      }),
    ).toEqual([])
  })
})

describe('reservation rules', () => {
  it('accepts complete fictional details and available dates', () => {
    expect(validateReservation(validValues, vehicle)).toEqual({})
  })

  it('reports useful field errors for incomplete details', () => {
    const errors = validateReservation(
      {
        ...validValues,
        endDate: validValues.startDate,
        pickupLocation: '',
        fullName: '',
        email: 'not-an-email',
        phone: '12',
        fictionalDataConfirmed: false,
      },
      vehicle,
    )

    expect(errors.endDate).toMatch(/after the collection/i)
    expect(errors.email).toMatch(/correct format/i)
    expect(errors.fictionalDataConfirmed).toMatch(/fictional/i)
  })

  it('detects an overlap while allowing dates beside the blocked range', () => {
    expect(isVehicleAvailable(vehicle, '2027-06-13', '2027-06-16')).toBe(false)
    expect(isVehicleAvailable(vehicle, '2027-06-09', '2027-06-12')).toBe(true)
    expect(isVehicleAvailable(vehicle, '2027-06-15', '2027-06-18')).toBe(true)
  })

  it('calculates a transparent day count and total', () => {
    expect(reservationDays('2027-06-16', '2027-06-19')).toBe(3)
    expect(
      createReservation(
        'WR-DEMO',
        '2026-08-03T10:00:00.000Z',
        vehicle,
        validValues,
      ),
    ).toMatchObject({ id: 'WR-DEMO', vehicleId: vehicle.id, totalPrice: 246 })
  })
})

describe('analytics contract', () => {
  it('records typed events only in memory', () => {
    const recorder = new InMemoryAnalyticsRecorder()
    recorder.record({
      name: 'vehicle_viewed',
      properties: { vehicleId: vehicle.id },
    })

    expect(recorder.events).toEqual([
      { name: 'vehicle_viewed', properties: { vehicleId: vehicle.id } },
    ])
  })
})
