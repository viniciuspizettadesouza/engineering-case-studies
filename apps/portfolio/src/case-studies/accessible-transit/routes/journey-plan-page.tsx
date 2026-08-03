import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  findMatchingJourneys,
  hasErrors,
  validateJourneySearch,
  type FieldErrors,
  type JourneySearchValues,
  type TransitTenant,
} from '../domain/ticketing'
import { findTransitTenant } from '../fixtures/tenants'
import {
  readTransitDraft,
  updateTransitDraft,
} from '../services/ticket-repository'
import {
  TransitLayout,
  transitPrimaryButton,
  transitSecondaryButton,
} from '../components/transit-layout'
import { ErrorSummary, SelectField } from '../components/form-controls'
import { JourneySummary } from '../components/journey-summary'
import { formatTime } from '../domain/presentation'
import { transitBasePath, transitTenantPath } from './route-paths'

const emptySearch: JourneySearchValues = {
  originId: '',
  destinationId: '',
  travelTime: '',
}

type ServiceState = 'ready' | 'loading' | 'error'

export function JourneyPlanPage() {
  const { tenantId } = useParams()
  const tenant = findTransitTenant(tenantId)

  if (!tenant) {
    return (
      <main id="main-content" className="px-6 py-20" tabIndex={-1}>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">
          Transport operator not found
        </h1>
        <Link
          className="mt-8 inline-block font-semibold underline"
          to={`${transitBasePath}/tickets/mossline/plan`}
        >
          Start with Mossline Transit
        </Link>
      </main>
    )
  }

  return <TenantJourneyPlan key={tenant.id} tenant={tenant} />
}

function TenantJourneyPlan({ tenant }: { readonly tenant: TransitTenant }) {
  const navigate = useNavigate()
  const storedDraft = readTransitDraft(window.localStorage, tenant.id)
  const [values, setValues] = useState(storedDraft.search ?? emptySearch)
  const [errors, setErrors] = useState<FieldErrors<JourneySearchValues>>({})
  const [searched, setSearched] = useState(false)
  const [selectedJourneyId, setSelectedJourneyId] = useState('')
  const [serviceState, setServiceState] = useState<ServiceState>('ready')
  const summaryRef = useRef<HTMLDivElement>(null)
  const results = searched ? findMatchingJourneys(tenant, values) : []

  const update = (field: keyof JourneySearchValues, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    setSearched(false)
    setSelectedJourneyId('')
    setErrors({})
    updateTransitDraft(window.localStorage, tenant.id, {
      search: next,
      journeyId: undefined,
      fareId: undefined,
    })
  }

  const search = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateJourneySearch(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    updateTransitDraft(window.localStorage, tenant.id, {
      search: values,
      journeyId: undefined,
      fareId: undefined,
    })
    setSearched(true)
  }

  const continueToFares = () => {
    updateTransitDraft(window.localStorage, tenant.id, {
      search: values,
      journeyId: selectedJourneyId,
      fareId: undefined,
    })
    void navigate(`${transitTenantPath(tenant.id)}/fares`)
  }

  return (
    <TransitLayout
      description={`${tenant.tagline} Every stop, time and service shown here is invented.`}
      eyebrow="Plan a fictional journey · Step 1 of 4"
      tenant={tenant}
      title="Where would you like to travel?"
    >
      <form className="mt-10 max-w-4xl space-y-7" noValidate onSubmit={search}>
        <ErrorSummary
          errors={Object.entries(errors).map(([field, message]) => ({
            field,
            message,
          }))}
          summaryRef={summaryRef}
        />
        <div className="grid gap-6 rounded-2xl border border-slate-200 p-5 md:grid-cols-3 dark:border-slate-800">
          <SelectField
            error={errors.originId}
            id="originId"
            label="Origin"
            onChange={(event) => update('originId', event.target.value)}
            value={values.originId}
          >
            <option value="">Choose an origin</option>
            {tenant.stops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            error={errors.destinationId}
            id="destinationId"
            label="Destination"
            onChange={(event) => update('destinationId', event.target.value)}
            value={values.destinationId}
          >
            <option value="">Choose a destination</option>
            {tenant.stops.map((stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            error={errors.travelTime}
            id="travelTime"
            label="Travel time"
            onChange={(event) => update('travelTime', event.target.value)}
            value={values.travelTime}
          >
            <option value="">Choose a departure</option>
            {tenant.journeys.map((journey) => (
              <option key={journey.id} value={journey.departure}>
                {formatTime(journey.departure)}
              </option>
            ))}
          </SelectField>
        </div>
        <button className={transitPrimaryButton} type="submit">
          Find journeys
        </button>
      </form>

      <details className="mt-8 max-w-4xl border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
        <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-200">
          Demonstrate journey service states
        </summary>
        <div className="mt-4 max-w-xs">
          <SelectField
            id="journeyServiceState"
            label="Demo journey service state"
            onChange={(event) =>
              setServiceState(event.target.value as ServiceState)
            }
            value={serviceState}
          >
            <option value="ready">Available</option>
            <option value="loading">Loading</option>
            <option value="error">Service error</option>
          </SelectField>
        </div>
      </details>

      <div aria-live="polite" className="mt-10 max-w-4xl">
        {serviceState === 'loading' ? (
          <StatePanel
            description="The deterministic demo is holding journey results in a loading state."
            title="Finding fictional journeys…"
          />
        ) : serviceState === 'error' ? (
          <div
            className="rounded-2xl border-2 border-red-600 bg-red-50 p-6 text-red-950 dark:bg-red-950/30 dark:text-red-100"
            role="alert"
          >
            <h2 className="text-xl font-semibold">
              Journeys could not be loaded
            </h2>
            <p className="mt-2">
              This simulated error does not affect the journey details you
              entered.
            </p>
            <button
              className={`${transitSecondaryButton} mt-5`}
              onClick={() => setServiceState('ready')}
              type="button"
            >
              Retry journey search
            </button>
          </div>
        ) : searched && results.length === 0 ? (
          <StatePanel
            description="Try a different invented stop pair or departure time. Your selections remain available above."
            title="No fictional journeys match"
          />
        ) : searched ? (
          <section aria-labelledby="journey-results-heading">
            <h2
              className="text-2xl font-semibold text-slate-950 dark:text-white"
              id="journey-results-heading"
            >
              Journey results
            </h2>
            <div className="mt-5 space-y-4">
              {results.map((journey) => (
                <div
                  className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  key={journey.id}
                >
                  <JourneySummary journey={journey} tenant={tenant} />
                  {journey.status === 'expired' ? (
                    <p
                      className="mt-4 rounded-lg bg-amber-50 p-3 font-semibold text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"
                      role="status"
                    >
                      This demonstration journey has expired. Choose another
                      departure.
                    </p>
                  ) : (
                    <div className="mt-5 flex items-center gap-3">
                      <input
                        checked={selectedJourneyId === journey.id}
                        className="size-5 accent-[var(--tenant-primary)]"
                        id={`journey-${journey.id}`}
                        name="journey"
                        onChange={() => setSelectedJourneyId(journey.id)}
                        type="radio"
                        value={journey.id}
                      />
                      <label
                        className="font-semibold text-slate-800 dark:text-slate-100"
                        htmlFor={`journey-${journey.id}`}
                      >
                        Select this journey
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {results.some(({ status }) => status === 'available') ? (
              <button
                className={`${transitPrimaryButton} mt-6`}
                disabled={!selectedJourneyId}
                onClick={continueToFares}
                type="button"
              >
                Continue to fares
              </button>
            ) : null}
          </section>
        ) : null}
      </div>
    </TransitLayout>
  )
}

function StatePanel({
  title,
  description,
}: {
  readonly title: string
  readonly description: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}
