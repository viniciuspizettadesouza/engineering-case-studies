import type { Vehicle } from '../domain/reservation'

export const vehicles: readonly Vehicle[] = [
  {
    id: 'aurora-compact',
    name: 'Aurora Compact',
    type: 'Compact camper',
    location: 'Northbridge',
    sleeps: 2,
    pricePerDay: 82,
    summary: 'A nimble two-person camper for coast roads and short escapes.',
    features: ['Convertible double bed', 'Induction hob', 'Rear camera'],
    image: 'vehicles/aurora.svg',
    unavailableRanges: [{ startDate: '2027-06-12', endDate: '2027-06-15' }],
  },
  {
    id: 'bramble-four',
    name: 'Bramble Four',
    type: 'Family camper',
    location: 'Northbridge',
    sleeps: 4,
    pricePerDay: 128,
    summary: 'Flexible family space with a quiet, practical interior.',
    features: ['Four berths', 'Dining table', 'Indoor shower'],
    image: 'vehicles/bramble.svg',
    unavailableRanges: [{ startDate: '2027-07-02', endDate: '2027-07-06' }],
  },
  {
    id: 'cinder-trail',
    name: 'Cinder Trail',
    type: 'Adventure camper',
    location: 'Merehaven',
    sleeps: 2,
    pricePerDay: 106,
    summary: 'Compact living with extra storage for longer trail days.',
    features: ['Bike storage', 'Solar charging', 'All-weather awning'],
    image: 'vehicles/cinder.svg',
    unavailableRanges: [{ startDate: '2027-06-20', endDate: '2027-06-23' }],
  },
  {
    id: 'driftwood-six',
    name: 'Driftwood Six',
    type: 'Large motorhome',
    location: 'Merehaven',
    sleeps: 6,
    pricePerDay: 176,
    summary: 'Room for a group, with distinct sleeping and dining zones.',
    features: ['Six berths', 'Full kitchen', 'Separate washroom'],
    image: 'vehicles/bramble.svg',
    unavailableRanges: [{ startDate: '2027-08-10', endDate: '2027-08-15' }],
  },
  {
    id: 'ember-roamer',
    name: 'Ember Roamer',
    type: 'Touring camper',
    location: 'Stonewick',
    sleeps: 4,
    pricePerDay: 142,
    summary: 'A comfortable four-berth base for unhurried touring.',
    features: ['Fixed rear bed', 'Panoramic roof', 'Heating'],
    image: 'vehicles/cinder.svg',
    unavailableRanges: [{ startDate: '2027-09-01', endDate: '2027-09-04' }],
  },
  {
    id: 'fenlight-mini',
    name: 'Fenlight Mini',
    type: 'Micro camper',
    location: 'Stonewick',
    sleeps: 2,
    pricePerDay: 68,
    summary: 'A simple, efficient micro camper for a weekend for two.',
    features: ['Fold-flat bed', 'Portable stove', 'Privacy screens'],
    image: 'vehicles/aurora.svg',
    unavailableRanges: [{ startDate: '2027-05-18', endDate: '2027-05-21' }],
  },
]

export function findVehicle(id: string | undefined): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id)
}

export const vehicleLocations = [
  ...new Set(vehicles.map(({ location }) => location)),
]
