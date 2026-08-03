import type { TransitTenant } from '../domain/ticketing'

export const transitTenants: readonly TransitTenant[] = [
  {
    id: 'mossline',
    name: 'Mossline Transit',
    tagline: 'Gentle journeys through the fictional Fernwater region.',
    tokens: {
      primary: '#166534',
      primaryDark: '#86efac',
      surface: '#f0fdf4',
      focus: '#15803d',
    },
    stops: [
      { id: 'fern-quay', name: 'Fern Quay' },
      { id: 'larkhill', name: 'Larkhill' },
      { id: 'mossbank', name: 'Mossbank' },
      { id: 'wrenmere', name: 'Wrenmere' },
    ],
    journeys: [
      {
        id: 'ml-0710',
        originId: 'fern-quay',
        destinationId: 'mossbank',
        departure: '2027-10-14T07:10',
        arrival: '2027-10-14T08:02',
        status: 'expired',
        fareIds: ['ml-day-single'],
      },
      {
        id: 'ml-0910',
        originId: 'fern-quay',
        destinationId: 'mossbank',
        departure: '2027-10-14T09:10',
        arrival: '2027-10-14T10:02',
        status: 'available',
        fareIds: ['ml-day-single', 'ml-flex'],
      },
      {
        id: 'ml-1125',
        originId: 'larkhill',
        destinationId: 'wrenmere',
        departure: '2027-10-14T11:25',
        arrival: '2027-10-14T12:08',
        status: 'available',
        fareIds: ['ml-day-single', 'ml-flex'],
      },
    ],
    fares: [
      {
        id: 'ml-day-single',
        name: 'Meadow Single',
        price: 12.4,
        description: 'Travel once on the selected fictional service.',
        restrictions: [
          'Valid only on the chosen departure',
          'Changes are not included',
        ],
      },
      {
        id: 'ml-flex',
        name: 'Fernwater Flexible',
        price: 18.8,
        description: 'Use the selected service or the next Mossline departure.',
        restrictions: [
          'Valid only on the selected travel date',
          'No refund after the first service departs',
        ],
      },
    ],
  },
  {
    id: 'sunmere',
    name: 'Sunmere Connect',
    tagline: 'Bright fictional links across the Copperfield coast.',
    tokens: {
      primary: '#9a3412',
      primaryDark: '#fdba74',
      surface: '#fff7ed',
      focus: '#c2410c',
    },
    stops: [
      { id: 'ember-cross', name: 'Ember Cross' },
      { id: 'glasswater', name: 'Glasswater' },
      { id: 'orchard-gate', name: 'Orchard Gate' },
      { id: 'sunmere-bay', name: 'Sunmere Bay' },
    ],
    journeys: [
      {
        id: 'sc-0820',
        originId: 'ember-cross',
        destinationId: 'sunmere-bay',
        departure: '2027-10-14T08:20',
        arrival: '2027-10-14T09:31',
        status: 'expired',
        fareIds: ['sc-saver'],
      },
      {
        id: 'sc-1020',
        originId: 'ember-cross',
        destinationId: 'sunmere-bay',
        departure: '2027-10-14T10:20',
        arrival: '2027-10-14T11:31',
        status: 'available',
        fareIds: ['sc-saver', 'sc-open'],
      },
      {
        id: 'sc-1340',
        originId: 'glasswater',
        destinationId: 'orchard-gate',
        departure: '2027-10-14T13:40',
        arrival: '2027-10-14T14:18',
        status: 'available',
        fareIds: ['sc-saver', 'sc-open'],
      },
    ],
    fares: [
      {
        id: 'sc-saver',
        name: 'Coast Saver',
        price: 14.2,
        description: 'The lowest invented price for the selected service.',
        restrictions: [
          'Valid only on the chosen departure',
          'Cannot be changed after confirmation',
        ],
      },
      {
        id: 'sc-open',
        name: 'Sunmere Open',
        price: 22.6,
        description: 'Travel on any Sunmere service on the selected date.',
        restrictions: [
          'Valid only between the selected stops',
          'Travel must finish before the end of the service day',
        ],
      },
    ],
  },
]

export function findTransitTenant(
  id: string | undefined,
): TransitTenant | undefined {
  return transitTenants.find((tenant) => tenant.id === id)
}

export function findStopName(tenant: TransitTenant, id: string): string {
  return tenant.stops.find((stop) => stop.id === id)?.name ?? 'Unknown stop'
}
