export interface TenantTokens {
  readonly primary: string
  readonly primaryDark: string
  readonly surface: string
  readonly focus: string
}

export interface Stop {
  readonly id: string
  readonly name: string
}

export interface Journey {
  readonly id: string
  readonly originId: string
  readonly destinationId: string
  readonly departure: string
  readonly arrival: string
  readonly status: 'available' | 'expired'
  readonly fareIds: readonly string[]
}

export interface Fare {
  readonly id: string
  readonly name: string
  readonly price: number
  readonly description: string
  readonly restrictions: readonly string[]
}

export interface TransitTenant {
  readonly id: string
  readonly name: string
  readonly tagline: string
  readonly tokens: TenantTokens
  readonly stops: readonly Stop[]
  readonly journeys: readonly Journey[]
  readonly fares: readonly Fare[]
}

export interface JourneySearchValues {
  readonly originId: string
  readonly destinationId: string
  readonly travelTime: string
}

export interface PassengerDetails {
  readonly fullName: string
  readonly email: string
  readonly assistanceRequested: boolean
}

export interface TicketDraft extends JourneySearchValues {
  readonly journeyId: string
  readonly fareId: string
  readonly passenger: PassengerDetails
}

export interface Ticket extends TicketDraft {
  readonly id: string
  readonly tenantId: string
  readonly purchasedAt: string
  readonly price: number
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateJourneySearch(
  values: JourneySearchValues,
): FieldErrors<JourneySearchValues> {
  const errors: FieldErrors<JourneySearchValues> = {}
  if (!values.originId) errors.originId = 'Choose an origin.'
  if (!values.destinationId) errors.destinationId = 'Choose a destination.'
  if (values.originId && values.originId === values.destinationId) {
    errors.destinationId = 'Choose a destination different from the origin.'
  }
  if (!values.travelTime) errors.travelTime = 'Choose a travel time.'
  return errors
}

export function findMatchingJourneys(
  tenant: TransitTenant,
  values: JourneySearchValues,
): readonly Journey[] {
  return tenant.journeys.filter(
    (journey) =>
      journey.originId === values.originId &&
      journey.destinationId === values.destinationId &&
      journey.departure === values.travelTime,
  )
}

export function eligibleFares(
  tenant: TransitTenant,
  journey: Journey,
): readonly Fare[] {
  return journey.fareIds
    .map((fareId) => tenant.fares.find(({ id }) => id === fareId))
    .filter((fare): fare is Fare => Boolean(fare))
}

export function validatePassenger(
  passenger: PassengerDetails,
): FieldErrors<PassengerDetails> {
  const errors: FieldErrors<PassengerDetails> = {}
  if (passenger.fullName.trim().length < 2) {
    errors.fullName = 'Enter a name with at least two characters.'
  }
  if (!emailPattern.test(passenger.email.trim())) {
    errors.email = 'Enter an email address in the correct format.'
  }
  return errors
}

export function createTicket(
  id: string,
  purchasedAt: string,
  tenant: TransitTenant,
  fare: Fare,
  draft: TicketDraft,
): Ticket {
  return {
    ...draft,
    id,
    tenantId: tenant.id,
    purchasedAt,
    price: fare.price,
  }
}

export function isJourneySearchValues(
  value: unknown,
): value is JourneySearchValues {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.originId === 'string' &&
    typeof candidate.destinationId === 'string' &&
    typeof candidate.travelTime === 'string'
  )
}

export function isPassengerDetails(value: unknown): value is PassengerDetails {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.assistanceRequested === 'boolean'
  )
}

export function hasErrors<T extends object>(errors: FieldErrors<T>): boolean {
  return Object.keys(errors).length > 0
}
