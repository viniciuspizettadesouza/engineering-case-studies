import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  hasErrors,
  isReservationFormValues,
  validateReservation,
  type FieldErrors,
  type ReservationFormValues,
} from '../domain/reservation'
import { findVehicle } from '../fixtures/vehicles'
import {
  readReservationDraft,
  saveReservationDraft,
} from '../services/reservation-repository'
import {
  CommerceLayout,
  commercePrimaryButton,
  commerceSecondaryButton,
} from '../components/commerce-layout'
import {
  ErrorSummary,
  InputField,
  SelectField,
} from '../components/form-controls'
import { commerceBasePath } from './route-paths'

const emptyReservation: ReservationFormValues = {
  startDate: '',
  endDate: '',
  pickupLocation: '',
  fullName: '',
  email: '',
  phone: '',
  fictionalDataConfirmed: false,
}

export function ReservationPage() {
  const { vehicleId } = useParams()
  const vehicle = findVehicle(vehicleId)
  const navigate = useNavigate()
  const [values, setValues] = useState<ReservationFormValues>(() => {
    const draft = vehicle
      ? readReservationDraft(window.localStorage, vehicle.id)
      : undefined
    if (isReservationFormValues(draft)) return draft
    return { ...emptyReservation, pickupLocation: vehicle?.location ?? '' }
  })
  const [errors, setErrors] = useState<FieldErrors<ReservationFormValues>>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  if (!vehicle) {
    return (
      <CommerceLayout
        description="Choose a vehicle before entering reservation details."
        eyebrow="Reservation"
        title="Vehicle details are required"
      >
        <Link
          className={`${commercePrimaryButton} mt-8`}
          to={`${commerceBasePath}/vehicles`}
        >
          Browse vehicles
        </Link>
      </CommerceLayout>
    )
  }

  const visibleErrors = submitted ? errors : {}
  const update = (
    field: keyof ReservationFormValues,
    value: string | boolean,
  ) => {
    const next = { ...values, [field]: value }
    setValues(next)
    saveReservationDraft(window.localStorage, vehicle.id, next)
    if (submitted) setErrors(validateReservation(next, vehicle))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateReservation(values, vehicle)
    setSubmitted(true)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    void navigate(`${commerceBasePath}/vehicles/${vehicle.id}/review`)
  }

  return (
    <CommerceLayout
      description="Enter fictional contact details. Your draft stays only in this browser and no payment information is collected."
      eyebrow="Reservation · Step 1 of 2"
      title={`Reserve ${vehicle.name}`}
    >
      <form className="mt-10 max-w-3xl space-y-8" noValidate onSubmit={submit}>
        <ErrorSummary
          errors={Object.entries(visibleErrors).map(([field, message]) => ({
            field,
            message,
          }))}
          summaryRef={summaryRef}
        />
        <fieldset className="space-y-6 rounded-2xl border border-slate-200 p-5 sm:p-7 dark:border-slate-800">
          <legend className="px-2 text-xl font-semibold text-slate-950 dark:text-white">
            Schedule
          </legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              error={visibleErrors.startDate}
              id="startDate"
              label="Collection date"
              onChange={(event) => update('startDate', event.target.value)}
              type="date"
              value={values.startDate}
            />
            <InputField
              error={visibleErrors.endDate}
              id="endDate"
              label="Return date"
              onChange={(event) => update('endDate', event.target.value)}
              type="date"
              value={values.endDate}
            />
          </div>
          <SelectField
            error={visibleErrors.pickupLocation}
            id="pickupLocation"
            label="Collection location"
            onChange={(event) => update('pickupLocation', event.target.value)}
            value={values.pickupLocation}
          >
            <option value="">Choose a location</option>
            <option value={vehicle.location}>{vehicle.location}</option>
          </SelectField>
          <p className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            Demo conflict: this vehicle is unavailable from{' '}
            {vehicle.unavailableRanges[0]?.startDate} to{' '}
            {vehicle.unavailableRanges[0]?.endDate}. Other entries remain intact
            if you choose overlapping dates.
          </p>
        </fieldset>
        <fieldset className="space-y-6 rounded-2xl border border-slate-200 p-5 sm:p-7 dark:border-slate-800">
          <legend className="px-2 text-xl font-semibold text-slate-950 dark:text-white">
            Fictional buyer
          </legend>
          <InputField
            autoComplete="name"
            error={visibleErrors.fullName}
            id="fullName"
            label="Full name"
            onChange={(event) => update('fullName', event.target.value)}
            value={values.fullName}
          />
          <InputField
            autoComplete="email"
            error={visibleErrors.email}
            id="email"
            label="Email address"
            onChange={(event) => update('email', event.target.value)}
            type="email"
            value={values.email}
          />
          <InputField
            autoComplete="tel"
            error={visibleErrors.phone}
            id="phone"
            label="Phone number"
            onChange={(event) => update('phone', event.target.value)}
            type="tel"
            value={values.phone}
          />
          <div>
            <div className="flex items-start gap-3">
              <input
                aria-describedby={
                  visibleErrors.fictionalDataConfirmed
                    ? 'fictionalDataConfirmed-error'
                    : undefined
                }
                aria-invalid={Boolean(visibleErrors.fictionalDataConfirmed)}
                checked={values.fictionalDataConfirmed}
                className="mt-1 size-5 accent-amber-700"
                id="fictionalDataConfirmed"
                onChange={(event) =>
                  update('fictionalDataConfirmed', event.target.checked)
                }
                type="checkbox"
              />
              <label
                className="text-sm leading-6 text-slate-700 dark:text-slate-300"
                htmlFor="fictionalDataConfirmed"
              >
                I confirm that these contact details are fictional and safe to
                store locally for this demo.
              </label>
            </div>
            {visibleErrors.fictionalDataConfirmed ? (
              <p
                className="mt-2 text-sm font-medium text-red-700 dark:text-red-300"
                id="fictionalDataConfirmed-error"
              >
                {visibleErrors.fictionalDataConfirmed}
              </p>
            ) : null}
          </div>
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <Link
            className={commerceSecondaryButton}
            to={`${commerceBasePath}/vehicles/${vehicle.id}`}
          >
            Back to vehicle
          </Link>
          <button className={commercePrimaryButton} type="submit">
            Review reservation
          </button>
        </div>
      </form>
    </CommerceLayout>
  )
}
