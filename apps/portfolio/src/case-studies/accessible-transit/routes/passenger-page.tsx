import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  hasErrors,
  validatePassenger,
  type FieldErrors,
  type PassengerDetails,
} from '../domain/ticketing'
import { findTransitTenant } from '../fixtures/tenants'
import {
  readTransitDraft,
  updateTransitDraft,
} from '../services/ticket-repository'
import {
  TransitLayout,
  transitPrimaryButton,
} from '../components/transit-layout'
import { ErrorSummary, InputField } from '../components/form-controls'
import { transitBasePath, transitTenantPath } from './route-paths'

const emptyPassenger: PassengerDetails = {
  fullName: '',
  email: '',
  assistanceRequested: false,
}

export function PassengerPage() {
  const { tenantId } = useParams()
  const tenant = findTransitTenant(tenantId)
  const draft = tenant
    ? readTransitDraft(window.localStorage, tenant.id)
    : undefined
  const journey = tenant?.journeys.find(({ id }) => id === draft?.journeyId)
  const fare = tenant?.fares.find(({ id }) => id === draft?.fareId)
  const navigate = useNavigate()
  const [passenger, setPassenger] = useState(draft?.passenger ?? emptyPassenger)
  const [errors, setErrors] = useState<FieldErrors<PassengerDetails>>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  if (!tenant || !journey || !fare || !journey.fareIds.includes(fare.id)) {
    return (
      <main id="main-content" className="px-6 py-20" tabIndex={-1}>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">
          Choose a journey and fare first
        </h1>
        <Link
          className="mt-8 inline-block font-semibold underline"
          to={
            tenant
              ? `${transitTenantPath(tenant.id)}/plan`
              : `${transitBasePath}/tickets/mossline/plan`
          }
        >
          Return to journey planning
        </Link>
      </main>
    )
  }

  const visibleErrors = submitted ? errors : {}
  const update = (field: keyof PassengerDetails, value: string | boolean) => {
    const next = { ...passenger, [field]: value }
    setPassenger(next)
    updateTransitDraft(window.localStorage, tenant.id, { passenger: next })
    if (submitted) setErrors(validatePassenger(next))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validatePassenger(passenger)
    setSubmitted(true)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    updateTransitDraft(window.localStorage, tenant.id, { passenger })
    void navigate(`${transitTenantPath(tenant.id)}/review`)
  }

  return (
    <TransitLayout
      description="Only a fictional name and email are required. Assistance preference is optional and stays in this browser."
      eyebrow="Passenger details · Step 3 of 4"
      tenant={tenant}
      title="Who is travelling?"
    >
      <form className="mt-10 max-w-2xl space-y-7" noValidate onSubmit={submit}>
        <ErrorSummary
          errors={Object.entries(visibleErrors).map(([field, message]) => ({
            field,
            message,
          }))}
          summaryRef={summaryRef}
        />
        <InputField
          autoComplete="name"
          error={visibleErrors.fullName}
          id="fullName"
          label="Passenger name"
          onChange={(event) => update('fullName', event.target.value)}
          value={passenger.fullName}
        />
        <InputField
          autoComplete="email"
          error={visibleErrors.email}
          hint="Use an invented address ending in .test for this demonstration."
          id="email"
          label="Email address"
          onChange={(event) => update('email', event.target.value)}
          type="email"
          value={passenger.email}
        />
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <input
              checked={passenger.assistanceRequested}
              className="mt-1 size-5 accent-[var(--tenant-primary)]"
              id="assistanceRequested"
              onChange={(event) =>
                update('assistanceRequested', event.target.checked)
              }
              type="checkbox"
            />
            <label
              className="text-sm leading-6 text-slate-700 dark:text-slate-300"
              htmlFor="assistanceRequested"
            >
              Add a fictional assistance request to the ticket
            </label>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            No assistance service is contacted. This option exists only to make
            the preference visible at review.
          </p>
        </div>
        <button className={transitPrimaryButton} type="submit">
          Review ticket order
        </button>
      </form>
    </TransitLayout>
  )
}
