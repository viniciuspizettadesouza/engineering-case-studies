import { Link } from 'react-router-dom'
import type { Vehicle } from '../domain/reservation'
import { commerceBasePath } from '../routes/route-paths'

export function VehicleImage({
  vehicle,
  priority = false,
}: {
  readonly vehicle: Vehicle
  readonly priority?: boolean
}) {
  return (
    <img
      alt={`${vehicle.name}, an illustrated ${vehicle.type.toLowerCase()}`}
      className="aspect-[16/9] w-full rounded-xl bg-amber-100 object-cover dark:bg-amber-950/30"
      decoding="async"
      height="450"
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      src={`${import.meta.env.BASE_URL}${vehicle.image}`}
      width="800"
    />
  )
}

export function VehicleCard({
  vehicle,
  priority = false,
}: {
  readonly vehicle: Vehicle
  readonly priority?: boolean
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <VehicleImage priority={priority} vehicle={vehicle} />
      <div className="px-1 pb-1 pt-5">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
          {vehicle.type}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
          {vehicle.name}
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          {vehicle.summary}
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <Fact label="Location" value={vehicle.location} />
          <Fact label="Sleeps" value={String(vehicle.sleeps)} />
          <Fact label="Per day" value={`£${vehicle.pricePerDay}`} />
        </dl>
        <Link
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-amber-700 dark:text-amber-300"
          to={`${commerceBasePath}/vehicles/${vehicle.id}`}
        >
          View {vehicle.name}
        </Link>
      </div>
    </article>
  )
}

function Fact({
  label,
  value,
}: {
  readonly label: string
  readonly value: string
}) {
  return (
    <div>
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
        {value}
      </dd>
    </div>
  )
}
