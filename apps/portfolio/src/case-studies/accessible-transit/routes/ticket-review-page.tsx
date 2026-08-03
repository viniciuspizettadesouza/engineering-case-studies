import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createTicket,
  eligibleFares,
  type TicketDraft,
} from '../domain/ticketing'
import { findStopName, findTransitTenant } from '../fixtures/tenants'
import {
  clearTransitDraft,
  readTransitDraft,
  saveTicket,
} from '../services/ticket-repository'
import {
  TransitLayout,
  transitPrimaryButton,
  transitSecondaryButton,
} from '../components/transit-layout'
import { JourneySummary } from '../components/journey-summary'
import { transitBasePath, transitTenantPath } from './route-paths'

type SubmissionState = 'idle' | 'submitting' | 'failed' | 'expired'

export function TicketReviewPage() {
  const { tenantId } = useParams()
  const tenant = findTransitTenant(tenantId)
  const stored = tenant
    ? readTransitDraft(window.localStorage, tenant.id)
    : undefined
  const journey = tenant?.journeys.find(({ id }) => id === stored?.journeyId)
  const fare = tenant?.fares.find(({ id }) => id === stored?.fareId)
  const isComplete = Boolean(
    tenant &&
    stored?.search &&
    journey &&
    fare &&
    stored.passenger &&
    journey.status === 'available' &&
    eligibleFares(tenant, journey).some(({ id }) => id === fare.id),
  )
  const navigate = useNavigate()
  const [simulateFailure, setSimulateFailure] = useState(false)
  const [simulateExpiry, setSimulateExpiry] = useState(false)
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const errorRef = useRef<HTMLDivElement>(null)

  if (!tenant || !stored || !journey || !fare || !isComplete) {
    return (
      <main id="main-content" className="px-6 py-20" tabIndex={-1}>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">
          Complete the ticket details first
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

  const draft: TicketDraft = {
    ...stored.search!,
    journeyId: journey.id,
    fareId: fare.id,
    passenger: stored.passenger!,
  }

  const submit = () => {
    setSubmissionState('submitting')
    window.setTimeout(() => {
      if (simulateExpiry) {
        setSubmissionState('expired')
        requestAnimationFrame(() => errorRef.current?.focus())
        return
      }
      if (simulateFailure) {
        setSimulateFailure(false)
        setSubmissionState('failed')
        requestAnimationFrame(() => errorRef.current?.focus())
        return
      }
      const id = `TK-${tenant.id.slice(0, 3).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
      saveTicket(
        window.localStorage,
        createTicket(id, new Date().toISOString(), tenant, fare, draft),
      )
      clearTransitDraft(window.localStorage, tenant.id)
      void navigate(`${transitTenantPath(tenant.id)}/ticket/${id}`)
    }, 350)
  }

  return (
    <TransitLayout
      description="Check the journey, fare and minimum passenger information before simulating the purchase."
      eyebrow="Review order · Step 4 of 4"
      tenant={tenant}
      title="Review your fictional ticket"
    >
      {submissionState === 'failed' || submissionState === 'expired' ? (
        <div
          className="mt-8 rounded-xl border-2 border-red-600 bg-red-50 p-5 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          ref={errorRef}
          role="alert"
          tabIndex={-1}
        >
          <h2 className="font-semibold">
            {submissionState === 'expired'
              ? 'The selected journey has expired'
              : 'The ticket was not purchased'}
          </h2>
          <p className="mt-2 text-sm">
            {submissionState === 'expired'
              ? 'This deterministic state represents a journey expiring during review. Choose another departure to continue.'
              : 'This is a simulated service failure. Your ticket details are unchanged; retry when ready.'}
          </p>
          {submissionState === 'expired' ? (
            <Link
              className={`${transitSecondaryButton} mt-5`}
              to={`${transitTenantPath(tenant.id)}/plan`}
            >
              Choose another journey
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="mt-10 space-y-6">
        <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Journey
            </h2>
            <Link
              className="font-semibold text-[var(--tenant-primary)] underline dark:text-[var(--tenant-primary-dark)]"
              to={`${transitTenantPath(tenant.id)}/plan`}
            >
              Edit journey
            </Link>
          </div>
          <div className="mt-5">
            <JourneySummary journey={journey} tenant={tenant} />
          </div>
        </section>
        <div className="grid gap-6 md:grid-cols-2">
          <ReviewSection
            editHref={`${transitTenantPath(tenant.id)}/fares`}
            editLabel="Edit fare"
            title="Fare"
          >
            <Item label="Fare" value={fare.name} />
            <Item label="Price" value={`£${fare.price.toFixed(2)}`} />
            <Item
              label="Route"
              value={`${findStopName(tenant, journey.originId)} to ${findStopName(tenant, journey.destinationId)}`}
            />
          </ReviewSection>
          <ReviewSection
            editHref={`${transitTenantPath(tenant.id)}/passenger`}
            editLabel="Edit passenger"
            title="Passenger"
          >
            <Item label="Name" value={draft.passenger.fullName} />
            <Item label="Email" value={draft.passenger.email} />
            <Item
              label="Assistance request"
              value={
                draft.passenger.assistanceRequested
                  ? 'Included in this demo'
                  : 'Not requested'
              }
            />
          </ReviewSection>
        </div>
      </div>

      <fieldset className="mt-8 rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
        <legend className="px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Demo controls
        </legend>
        <div className="space-y-3">
          <CheckControl
            checked={simulateFailure}
            id="simulateTicketFailure"
            label="Simulate one recoverable purchase failure"
            onChange={setSimulateFailure}
          />
          <CheckControl
            checked={simulateExpiry}
            id="simulateJourneyExpiry"
            label="Simulate the journey expiring during review"
            onChange={setSimulateExpiry}
          />
        </div>
      </fieldset>
      <button
        className={`${transitPrimaryButton} mt-8`}
        disabled={
          submissionState === 'submitting' || submissionState === 'expired'
        }
        onClick={submit}
        type="button"
      >
        {submissionState === 'submitting'
          ? 'Purchasing…'
          : submissionState === 'failed'
            ? 'Retry simulated purchase'
            : 'Simulate ticket purchase'}
      </button>
      <span aria-live="polite" className="sr-only">
        {submissionState === 'submitting'
          ? 'Simulated ticket purchase in progress'
          : ''}
      </span>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        No payment details are requested and no real ticket, message or
        fulfilment action will be created.
      </p>
    </TransitLayout>
  )
}

function ReviewSection({
  title,
  editHref,
  editLabel,
  children,
}: {
  readonly title: string
  readonly editHref: string
  readonly editLabel: string
  readonly children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>
        <Link
          className="font-semibold text-[var(--tenant-primary)] underline dark:text-[var(--tenant-primary-dark)]"
          to={editHref}
        >
          {editLabel}
        </Link>
      </div>
      <dl className="mt-5 space-y-4 text-sm">{children}</dl>
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
      <dd className="mt-1 break-words font-semibold text-slate-950 dark:text-white">
        {value}
      </dd>
    </div>
  )
}

function CheckControl({
  id,
  label,
  checked,
  onChange,
}: {
  readonly id: string
  readonly label: string
  readonly checked: boolean
  readonly onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        checked={checked}
        className="mt-1 size-5 accent-[var(--tenant-primary)]"
        id={id}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <label
        className="text-sm leading-6 text-slate-700 dark:text-slate-300"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
