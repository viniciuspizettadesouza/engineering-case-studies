import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  commerceAnalytics,
  createReservation,
  hasErrors,
  isReservationFormValues,
  reservationDays,
  validateReservation,
} from '../domain/reservation'
import { findVehicle } from '../fixtures/vehicles'
import {
  clearReservationDraft,
  readReservationDraft,
  saveReservation,
} from '../services/reservation-repository'
import {
  CommerceLayout,
  commercePrimaryButton,
  commerceSecondaryButton,
} from '../components/commerce-layout'
import { commerceBasePath } from './route-paths'

export function ReservationReviewPage() {
  const { vehicleId } = useParams()
  const vehicle = findVehicle(vehicleId)
  const draft = vehicle
    ? readReservationDraft(window.localStorage, vehicle.id)
    : undefined
  const values = isReservationFormValues(draft) ? draft : undefined
  const navigate = useNavigate()
  const [simulateFailure, setSimulateFailure] = useState(false)
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'failed'
  >('idle')
  const errorRef = useRef<HTMLDivElement>(null)

  if (!vehicle || !values || hasErrors(validateReservation(values, vehicle))) {
    return (
      <CommerceLayout
        description="Complete valid reservation details before reviewing the request."
        eyebrow="Reservation review"
        title="Reservation details are required"
      >
        <Link
          className={`${commercePrimaryButton} mt-8`}
          to={
            vehicle
              ? `${commerceBasePath}/vehicles/${vehicle.id}/reserve`
              : `${commerceBasePath}/vehicles`
          }
        >
          Return to reservation
        </Link>
      </CommerceLayout>
    )
  }

  const days = reservationDays(values.startDate, values.endDate)

  const submit = () => {
    setSubmissionState('submitting')
    window.setTimeout(() => {
      if (simulateFailure) {
        setSimulateFailure(false)
        setSubmissionState('failed')
        requestAnimationFrame(() => errorRef.current?.focus())
        return
      }
      const id = `WR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
      const reservation = createReservation(
        id,
        new Date().toISOString(),
        vehicle,
        values,
      )
      saveReservation(window.localStorage, reservation)
      clearReservationDraft(window.localStorage, vehicle.id)
      commerceAnalytics.record({
        name: 'reservation_submitted',
        properties: { vehicleId: vehicle.id, reservationId: id },
      })
      void navigate(`${commerceBasePath}/confirmation/${id}`)
    }, 350)
  }

  return (
    <CommerceLayout
      description="Check the fictional vehicle, schedule and buyer information before simulating submission."
      eyebrow="Reservation · Step 2 of 2"
      title="Review your reservation request"
    >
      {submissionState === 'failed' ? (
        <div
          className="mt-8 rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          ref={errorRef}
          role="alert"
          tabIndex={-1}
        >
          <h2 className="font-semibold">The reservation was not submitted</h2>
          <p className="mt-2 text-sm">
            This is a simulated service failure. Your reviewed details are
            unchanged; retry when ready.
          </p>
        </div>
      ) : null}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ReviewSection title="Vehicle">
          <Item label="Vehicle" value={vehicle.name} />
          <Item label="Daily price" value={`£${vehicle.pricePerDay}`} />
          <Item label="Sleeping capacity" value={String(vehicle.sleeps)} />
        </ReviewSection>
        <ReviewSection title="Schedule">
          <Item label="Collection" value={values.startDate} />
          <Item label="Return" value={values.endDate} />
          <Item label="Location" value={values.pickupLocation} />
        </ReviewSection>
        <ReviewSection title="Fictional buyer">
          <Item label="Name" value={values.fullName} />
          <Item label="Email" value={values.email} />
          <Item label="Phone" value={values.phone} />
        </ReviewSection>
      </div>
      <div className="mt-8 rounded-2xl bg-amber-50 p-6 dark:bg-amber-950/30">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Estimated total · {days} {days === 1 ? 'day' : 'days'}
        </p>
        <p className="mt-1 text-3xl font-semibold text-slate-950 dark:text-white">
          £{days * vehicle.pricePerDay}
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          No charge or real reservation will be made.
        </p>
      </div>
      <fieldset className="mt-8 rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
        <legend className="px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Demo controls
        </legend>
        <div className="flex items-start gap-3">
          <input
            checked={simulateFailure}
            className="mt-1 size-5 accent-amber-700"
            id="simulateReservationFailure"
            onChange={(event) => setSimulateFailure(event.target.checked)}
            type="checkbox"
          />
          <label
            className="text-sm leading-6 text-slate-700 dark:text-slate-300"
            htmlFor="simulateReservationFailure"
          >
            Simulate one recoverable submission failure
          </label>
        </div>
      </fieldset>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className={commerceSecondaryButton}
          to={`${commerceBasePath}/vehicles/${vehicle.id}/reserve`}
        >
          Edit details
        </Link>
        <button
          className={commercePrimaryButton}
          disabled={submissionState === 'submitting'}
          onClick={submit}
          type="button"
        >
          {submissionState === 'submitting'
            ? 'Submitting…'
            : submissionState === 'failed'
              ? 'Retry reservation'
              : 'Submit reservation request'}
        </button>
        <span aria-live="polite" className="sr-only">
          {submissionState === 'submitting'
            ? 'Submitting reservation request'
            : ''}
        </span>
      </div>
    </CommerceLayout>
  )
}

function ReviewSection({
  title,
  children,
}: {
  readonly title: string
  readonly children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
        {title}
      </h2>
      <dl className="mt-4 space-y-4 text-sm">{children}</dl>
    </section>
  )
}

function Item({
  label,
  value,
}: {
  readonly label: string
  readonly value: string
}) {
  return (
    <div>
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 break-words font-medium text-slate-950 dark:text-white">
        {value}
      </dd>
    </div>
  )
}
