export interface Vehicle {
  readonly id: string
  readonly name: string
  readonly type: string
  readonly location: string
  readonly sleeps: number
  readonly pricePerDay: number
  readonly summary: string
  readonly features: readonly string[]
  readonly image: string
  readonly unavailableRanges: readonly DateRange[]
}

export interface DateRange {
  readonly startDate: string
  readonly endDate: string
}

export interface CatalogueFilters {
  readonly location: string
  readonly sleeps: string
  readonly maxPrice: string
}

export interface ReservationFormValues {
  readonly startDate: string
  readonly endDate: string
  readonly pickupLocation: string
  readonly fullName: string
  readonly email: string
  readonly phone: string
  readonly fictionalDataConfirmed: boolean
}

export function isReservationFormValues(
  value: unknown,
): value is ReservationFormValues {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.startDate === 'string' &&
    typeof candidate.endDate === 'string' &&
    typeof candidate.pickupLocation === 'string' &&
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.phone === 'string' &&
    typeof candidate.fictionalDataConfirmed === 'boolean'
  )
}

export interface Reservation extends ReservationFormValues {
  readonly id: string
  readonly vehicleId: string
  readonly submittedAt: string
  readonly totalPrice: number
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function filterVehicles(
  vehicles: readonly Vehicle[],
  filters: CatalogueFilters,
): readonly Vehicle[] {
  const sleeps = Number(filters.sleeps)
  const maxPrice = Number(filters.maxPrice)

  return vehicles.filter(
    (vehicle) =>
      (!filters.location || vehicle.location === filters.location) &&
      (!filters.sleeps || vehicle.sleeps >= sleeps) &&
      (!filters.maxPrice || vehicle.pricePerDay <= maxPrice),
  )
}

export function validateReservation(
  values: ReservationFormValues,
  vehicle: Vehicle,
): FieldErrors<ReservationFormValues> {
  const errors: FieldErrors<ReservationFormValues> = {}

  if (!values.startDate) errors.startDate = 'Choose a collection date.'
  if (!values.endDate) errors.endDate = 'Choose a return date.'

  if (
    values.startDate &&
    values.endDate &&
    values.endDate <= values.startDate
  ) {
    errors.endDate = 'Choose a return date after the collection date.'
  } else if (
    values.startDate &&
    values.endDate &&
    !isVehicleAvailable(vehicle, values.startDate, values.endDate)
  ) {
    errors.startDate =
      'Those dates are unavailable. Choose dates outside the listed unavailable period.'
  }

  if (values.pickupLocation !== vehicle.location) {
    errors.pickupLocation = 'Choose the location assigned to this vehicle.'
  }
  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Enter a name with at least two characters.'
  }
  if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter an email address in the correct format.'
  }
  if (values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number with at least seven digits.'
  }
  if (!values.fictionalDataConfirmed) {
    errors.fictionalDataConfirmed =
      'Confirm that the contact information is fictional.'
  }

  return errors
}

export function isVehicleAvailable(
  vehicle: Vehicle,
  startDate: string,
  endDate: string,
): boolean {
  return !vehicle.unavailableRanges.some(
    (range) => startDate < range.endDate && endDate > range.startDate,
  )
}

export function reservationDays(startDate: string, endDate: string): number {
  const milliseconds = Date.parse(endDate) - Date.parse(startDate)
  return Math.max(0, Math.round(milliseconds / 86_400_000))
}

export function createReservation(
  id: string,
  submittedAt: string,
  vehicle: Vehicle,
  values: ReservationFormValues,
): Reservation {
  return {
    ...values,
    id,
    vehicleId: vehicle.id,
    submittedAt,
    totalPrice:
      reservationDays(values.startDate, values.endDate) * vehicle.pricePerDay,
  }
}

export function hasErrors<T extends object>(errors: FieldErrors<T>): boolean {
  return Object.keys(errors).length > 0
}

export type CommerceAnalyticsEvent =
  | {
      readonly name: 'catalogue_filter_applied'
      readonly properties: CatalogueFilters
    }
  | {
      readonly name: 'vehicle_viewed' | 'reservation_started'
      readonly properties: { readonly vehicleId: string }
    }
  | {
      readonly name: 'reservation_submitted'
      readonly properties: {
        readonly vehicleId: string
        readonly reservationId: string
      }
    }

export interface AnalyticsRecorder {
  record(event: CommerceAnalyticsEvent): void
}

export class InMemoryAnalyticsRecorder implements AnalyticsRecorder {
  readonly events: CommerceAnalyticsEvent[] = []

  record(event: CommerceAnalyticsEvent): void {
    this.events.push(event)
  }
}

// This recorder deliberately has no transport. Events exist only as a local contract.
export const commerceAnalytics = new InMemoryAnalyticsRecorder()
