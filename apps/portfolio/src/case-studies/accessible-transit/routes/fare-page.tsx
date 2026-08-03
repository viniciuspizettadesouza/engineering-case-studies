import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { eligibleFares } from '../domain/ticketing'
import { findTransitTenant } from '../fixtures/tenants'
import {
  readTransitDraft,
  updateTransitDraft,
} from '../services/ticket-repository'
import {
  TransitLayout,
  transitPrimaryButton,
} from '../components/transit-layout'
import { JourneySummary } from '../components/journey-summary'
import { transitBasePath, transitTenantPath } from './route-paths'

export function FarePage() {
  const { tenantId } = useParams()
  const tenant = findTransitTenant(tenantId)
  const draft = tenant
    ? readTransitDraft(window.localStorage, tenant.id)
    : undefined
  const journey = tenant?.journeys.find(({ id }) => id === draft?.journeyId)
  const fares = tenant && journey ? eligibleFares(tenant, journey) : []
  const navigate = useNavigate()
  const [fareId, setFareId] = useState(
    fares.some(({ id }) => id === draft?.fareId) ? (draft?.fareId ?? '') : '',
  )

  if (!tenant || !journey || journey.status !== 'available') {
    return (
      <main id="main-content" className="px-6 py-20" tabIndex={-1}>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">
          Choose an available journey first
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

  const continueToPassenger = () => {
    updateTransitDraft(window.localStorage, tenant.id, { fareId })
    void navigate(`${transitTenantPath(tenant.id)}/passenger`)
  }

  return (
    <TransitLayout
      description="Compare the eligible invented fares. Price, flexibility and restrictions are described in text."
      eyebrow="Choose a fare · Step 2 of 4"
      tenant={tenant}
      title="Select the fare that suits you"
    >
      <section className="mt-10 rounded-2xl bg-[var(--tenant-surface)] p-5 dark:bg-slate-900">
        <h2 className="sr-only">Selected journey</h2>
        <JourneySummary journey={journey} tenant={tenant} />
      </section>
      <fieldset className="mt-8 space-y-5">
        <legend className="text-2xl font-semibold text-slate-950 dark:text-white">
          Eligible fares
        </legend>
        {fares.map((fare) => (
          <div
            className="rounded-2xl border border-slate-200 p-5 has-checked:border-[var(--tenant-primary)] has-checked:ring-2 has-checked:ring-[var(--tenant-primary)]/20 dark:border-slate-800"
            key={fare.id}
          >
            <div className="flex items-start gap-3">
              <input
                checked={fareId === fare.id}
                className="mt-1 size-5 accent-[var(--tenant-primary)]"
                id={`fare-${fare.id}`}
                name="fare"
                onChange={() => setFareId(fare.id)}
                type="radio"
                value={fare.id}
              />
              <div className="flex-1">
                <label
                  className="flex cursor-pointer flex-wrap justify-between gap-3 text-xl font-semibold text-slate-950 dark:text-white"
                  htmlFor={`fare-${fare.id}`}
                >
                  <span>{fare.name}</span>
                  <span>£{fare.price.toFixed(2)}</span>
                </label>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {fare.description}
                </p>
                <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Important restrictions
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {fare.restrictions.map((restriction) => (
                    <li key={restriction}>{restriction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </fieldset>
      <button
        className={`${transitPrimaryButton} mt-8`}
        disabled={!fareId}
        onClick={continueToPassenger}
        type="button"
      >
        Continue to passenger details
      </button>
      <p aria-live="polite" className="sr-only">
        {fareId
          ? `${fares.find(({ id }) => id === fareId)?.name ?? 'Fare'} selected`
          : ''}
      </p>
    </TransitLayout>
  )
}
