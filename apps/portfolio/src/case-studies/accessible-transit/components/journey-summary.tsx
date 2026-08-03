import type { Journey, TransitTenant } from '../domain/ticketing'
import { formatTime } from '../domain/presentation'
import { findStopName } from '../fixtures/tenants'

export function JourneySummary({
  tenant,
  journey,
}: {
  readonly tenant: TransitTenant
  readonly journey: Journey
}) {
  return (
    <dl className="grid gap-4 text-sm sm:grid-cols-4">
      <Item label="From" value={findStopName(tenant, journey.originId)} />
      <Item label="To" value={findStopName(tenant, journey.destinationId)} />
      <Item label="Departs" value={formatTime(journey.departure)} />
      <Item label="Arrives" value={formatTime(journey.arrival)} />
    </dl>
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
