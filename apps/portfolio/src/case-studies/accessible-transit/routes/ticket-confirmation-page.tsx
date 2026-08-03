import { Link, useParams } from 'react-router-dom'
import { findStopName, findTransitTenant } from '../fixtures/tenants'
import { findTicket } from '../services/ticket-repository'
import {
  TransitLayout,
  transitPrimaryButton,
} from '../components/transit-layout'
import { formatTime } from '../domain/presentation'
import { transitBasePath, transitTenantPath } from './route-paths'

export function TicketConfirmationPage() {
  const { tenantId, ticketId } = useParams()
  const tenant = findTransitTenant(tenantId)
  const ticket = ticketId
    ? findTicket(window.localStorage, ticketId)
    : undefined
  const journey = tenant?.journeys.find(({ id }) => id === ticket?.journeyId)
  const fare = tenant?.fares.find(({ id }) => id === ticket?.fareId)

  if (
    !tenant ||
    !ticket ||
    ticket.tenantId !== tenant.id ||
    !journey ||
    !fare
  ) {
    return (
      <main id="main-content" className="px-6 py-20" tabIndex={-1}>
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white">
          Fictional ticket not found
        </h1>
        <Link
          className="mt-8 inline-block font-semibold underline"
          to={`${transitBasePath}/tickets/mossline/plan`}
        >
          Plan a new journey
        </Link>
      </main>
    )
  }

  return (
    <TransitLayout
      description="This ticket is a browser-local demonstration. No payment, message or real fulfilment occurred."
      eyebrow="Simulated ticket confirmation"
      tenant={tenant}
      title="Your fictional ticket is ready"
    >
      <section
        aria-labelledby="ticket-heading"
        className="mt-10 max-w-3xl overflow-hidden rounded-2xl border-2 border-[var(--tenant-primary)] bg-[var(--tenant-surface)] dark:bg-slate-900"
      >
        <div className="bg-[var(--tenant-primary)] p-6 text-white dark:bg-[var(--tenant-primary-dark)] dark:text-slate-950">
          <p className="text-sm font-semibold uppercase tracking-wider">
            Simulated digital ticket
          </p>
          <h2 className="mt-2 text-2xl font-semibold" id="ticket-heading">
            {ticket.id}
          </h2>
        </div>
        <dl className="grid gap-6 p-6 text-sm sm:grid-cols-2">
          <Item
            label="Journey"
            value={`${findStopName(tenant, journey.originId)} to ${findStopName(tenant, journey.destinationId)}`}
          />
          <Item label="Departure" value={formatTime(journey.departure)} />
          <Item label="Passenger" value={ticket.passenger.fullName} />
          <Item
            label="Fare"
            value={`${fare.name} · £${ticket.price.toFixed(2)}`}
          />
          <Item
            label="Assistance request"
            value={
              ticket.passenger.assistanceRequested
                ? 'Fictionally recorded'
                : 'Not requested'
            }
          />
          <Item label="Operator" value={tenant.name} />
        </dl>
        <p className="border-t border-slate-300 p-6 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:text-slate-300">
          Not valid for travel. This reference can be changed or deleted through
          browser storage and must not be treated as proof of purchase.
        </p>
      </section>
      <Link
        className={`${transitPrimaryButton} mt-8`}
        to={`${transitTenantPath(tenant.id)}/plan`}
      >
        Plan another fictional journey
      </Link>
    </TransitLayout>
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
      <dd className="mt-1 font-semibold text-slate-950 dark:text-white">
        {value}
      </dd>
    </div>
  )
}
