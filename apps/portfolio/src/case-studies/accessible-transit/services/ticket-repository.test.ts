import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearTransitDraft,
  findTicket,
  readTransitDraft,
  saveTicket,
  updateTransitDraft,
} from './ticket-repository'

describe('tenant-scoped ticket repository', () => {
  beforeEach(() => window.localStorage.clear())

  it('does not expose one operator draft to another operator', () => {
    updateTransitDraft(window.localStorage, 'mossline', {
      search: {
        originId: 'fern-quay',
        destinationId: 'mossbank',
        travelTime: '2027-10-14T09:10',
      },
      journeyId: 'ml-0910',
    })

    expect(readTransitDraft(window.localStorage, 'mossline')).toMatchObject({
      journeyId: 'ml-0910',
    })
    expect(readTransitDraft(window.localStorage, 'sunmere')).toEqual({})
  })

  it('clears only the selected operator draft', () => {
    updateTransitDraft(window.localStorage, 'mossline', {
      journeyId: 'ml-0910',
    })
    updateTransitDraft(window.localStorage, 'sunmere', {
      journeyId: 'sc-1020',
    })

    clearTransitDraft(window.localStorage, 'mossline')

    expect(readTransitDraft(window.localStorage, 'mossline')).toEqual({})
    expect(readTransitDraft(window.localStorage, 'sunmere')).toMatchObject({
      journeyId: 'sc-1020',
    })
  })

  it('sanitises malformed and unexpected draft values', () => {
    window.localStorage.setItem(
      'engineering-case-studies.transit-draft.v1.mossline',
      JSON.stringify({ search: 'not-a-search', journeyId: 42 }),
    )
    expect(readTransitDraft(window.localStorage, 'mossline')).toEqual({})

    window.localStorage.setItem(
      'engineering-case-studies.transit-draft.v1.mossline',
      '{broken',
    )
    expect(readTransitDraft(window.localStorage, 'mossline')).toEqual({})
  })

  it('stores a simulated ticket that can be retrieved by reference', () => {
    const ticket = {
      id: 'TK-MOS-TEST',
      tenantId: 'mossline',
      purchasedAt: '2026-08-03T10:00:00.000Z',
      price: 18.8,
      originId: 'fern-quay',
      destinationId: 'mossbank',
      travelTime: '2027-10-14T09:10',
      journeyId: 'ml-0910',
      fareId: 'ml-flex',
      passenger: {
        fullName: 'Demo Passenger',
        email: 'passenger@example.test',
        assistanceRequested: false,
      },
    }
    saveTicket(window.localStorage, ticket)
    expect(findTicket(window.localStorage, ticket.id)).toEqual(ticket)
  })
})
