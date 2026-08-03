import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { commerceAnalytics } from '../domain/reservation'
import { findVehicle } from '../fixtures/vehicles'
import {
  CommerceLayout,
  commercePrimaryButton,
  commerceSecondaryButton,
} from '../components/commerce-layout'
import { VehicleImage } from '../components/vehicle-card'
import { commerceBasePath } from './route-paths'

export function VehicleDetailPage() {
  const { vehicleId } = useParams()
  const vehicle = findVehicle(vehicleId)

  useEffect(() => {
    if (vehicle) {
      commerceAnalytics.record({
        name: 'vehicle_viewed',
        properties: { vehicleId: vehicle.id },
      })
    }
  }, [vehicle])

  if (!vehicle) {
    return (
      <CommerceLayout
        description="The requested fictional vehicle is not in this catalogue."
        eyebrow="Vehicle not found"
        title="That vehicle is unavailable"
      >
        <Link
          className={`${commerceSecondaryButton} mt-8`}
          to={`${commerceBasePath}/vehicles`}
        >
          Return to the catalogue
        </Link>
      </CommerceLayout>
    )
  }

  return (
    <CommerceLayout
      description={vehicle.summary}
      eyebrow={vehicle.type}
      title={vehicle.name}
    >
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
        <div>
          <VehicleImage priority vehicle={vehicle} />
          <section aria-labelledby="features-heading" className="mt-8">
            <h2
              className="text-2xl font-semibold text-slate-950 dark:text-white"
              id="features-heading"
            >
              What is included
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {vehicle.features.map((feature) => (
                <li
                  className="rounded-xl bg-slate-100 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  key={feature}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="h-fit rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
          <p className="text-3xl font-semibold text-slate-950 dark:text-white">
            £{vehicle.pricePerDay}
            <span className="text-base font-normal text-slate-600 dark:text-slate-300">
              {' '}
              per day
            </span>
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            <Detail label="Collection" value={vehicle.location} />
            <Detail label="Sleeps" value={`${vehicle.sleeps} people`} />
            <Detail
              label="Unavailable"
              value={vehicle.unavailableRanges
                .map(
                  (range) =>
                    `${formatDate(range.startDate)}–${formatDate(range.endDate)}`,
                )
                .join(', ')}
            />
          </dl>
          <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Dates are fictional and shown so that availability conflicts can be
            tested.
          </p>
          <Link
            className={`${commercePrimaryButton} mt-6 w-full`}
            onClick={() =>
              commerceAnalytics.record({
                name: 'reservation_started',
                properties: { vehicleId: vehicle.id },
              })
            }
            to={`${commerceBasePath}/vehicles/${vehicle.id}/reserve`}
          >
            Reserve {vehicle.name}
          </Link>
        </aside>
      </div>
    </CommerceLayout>
  )
}

function Detail({
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

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}
