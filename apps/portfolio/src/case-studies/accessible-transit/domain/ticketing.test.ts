import { describe, expect, it } from 'vitest'
import { transitTenants } from '../fixtures/tenants'
import {
  createTicket,
  eligibleFares,
  findMatchingJourneys,
  validateJourneySearch,
  validatePassenger,
} from './ticketing'

const mossline = transitTenants[0]!

describe('tenant journey planning', () => {
  it('keeps operator fixtures and tokens distinct', () => {
    const sunmere = transitTenants[1]!
    expect(mossline.stops.map(({ id }) => id)).not.toEqual(
      sunmere.stops.map(({ id }) => id),
    )
    expect(mossline.tokens.primary).not.toBe(sunmere.tokens.primary)
    expect(mossline.fares.map(({ id }) => id)).not.toEqual(
      sunmere.fares.map(({ id }) => id),
    )
  })

  it('validates required, different stops and a travel time', () => {
    expect(
      validateJourneySearch({
        originId: 'fern-quay',
        destinationId: 'fern-quay',
        travelTime: '',
      }),
    ).toEqual({
      destinationId: 'Choose a destination different from the origin.',
      travelTime: 'Choose a travel time.',
    })
  })

  it('returns an exact invented journey and a deterministic no-result state', () => {
    const journey = findMatchingJourneys(mossline, {
      originId: 'fern-quay',
      destinationId: 'mossbank',
      travelTime: '2027-10-14T09:10',
    })
    const noResults = findMatchingJourneys(mossline, {
      originId: 'fern-quay',
      destinationId: 'wrenmere',
      travelTime: '2027-10-14T09:10',
    })

    expect(journey).toMatchObject([{ id: 'ml-0910', status: 'available' }])
    expect(noResults).toEqual([])
  })

  it('exposes an expired journey without making it available', () => {
    expect(
      findMatchingJourneys(mossline, {
        originId: 'fern-quay',
        destinationId: 'mossbank',
        travelTime: '2027-10-14T07:10',
      }),
    ).toMatchObject([{ id: 'ml-0710', status: 'expired' }])
  })
})

describe('fares and tickets', () => {
  it('returns only fares configured for the selected journey', () => {
    const journey = mossline.journeys.find(({ id }) => id === 'ml-0910')!
    expect(eligibleFares(mossline, journey).map(({ id }) => id)).toEqual([
      'ml-day-single',
      'ml-flex',
    ])
  })

  it('requires a plausible fictional passenger name and email', () => {
    expect(
      validatePassenger({
        fullName: '',
        email: 'invalid',
        assistanceRequested: false,
      }),
    ).toEqual({
      fullName: 'Enter a name with at least two characters.',
      email: 'Enter an email address in the correct format.',
    })
  })

  it('creates a tenant-scoped simulated ticket at the selected fare price', () => {
    const fare = mossline.fares.find(({ id }) => id === 'ml-flex')!
    const ticket = createTicket(
      'TK-MOS-TEST',
      '2026-08-03T10:00:00.000Z',
      mossline,
      fare,
      {
        originId: 'fern-quay',
        destinationId: 'mossbank',
        travelTime: '2027-10-14T09:10',
        journeyId: 'ml-0910',
        fareId: fare.id,
        passenger: {
          fullName: 'Demo Passenger',
          email: 'passenger@example.test',
          assistanceRequested: true,
        },
      },
    )

    expect(ticket).toMatchObject({
      id: 'TK-MOS-TEST',
      tenantId: 'mossline',
      price: 18.8,
    })
  })
})
