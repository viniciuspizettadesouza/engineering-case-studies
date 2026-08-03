import { Link, useParams } from 'react-router-dom'
import { findVehicle } from '../fixtures/vehicles'
import { findReservation } from '../services/reservation-repository'
import {
  CommerceLayout,
  commercePrimaryButton,
} from '../components/commerce-layout'
import { commerceBasePath } from './route-paths'

export function ReservationConfirmationPage() {
  const { reservationId } = useParams()
  const reservation = reservationId
    ? findReservation(window.localStorage, reservationId)
    : undefined
  const vehicle = findVehicle(reservation?.vehicleId)

  if (!reservation || !vehicle) {
    return (
      <CommerceLayout
        description="Reservation confirmations exist only in the browser where the demo request was submitted."
        eyebrow="Reservation confirmation"
        title="Confirmation not found"
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

  return (
    <CommerceLayout
      description="The demonstration request has been recorded locally. No payment, inventory hold or real reservation occurred."
      eyebrow="Simulated confirmation"
      title="Your request has been received"
    >
      <section
        className="mt-10 max-w-2xl rounded-2xl border border-emerald-300 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/30"
        aria-labelledby="confirmation-heading"
      >
        <h2
          className="text-xl font-semibold text-emerald-950 dark:text-emerald-100"
          id="confirmation-heading"
        >
          Fictional reference {reservation.id}
        </h2>
        <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
          <Item label="Vehicle" value={vehicle.name} />
          <Item label="Location" value={reservation.pickupLocation} />
          <Item label="Collection" value={reservation.startDate} />
          <Item label="Return" value={reservation.endDate} />
          <Item label="Estimated total" value={`£${reservation.totalPrice}`} />
          <Item label="Contact" value={reservation.email} />
        </dl>
      </section>
      <p className="mt-6 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
        This static prototype does not contact a dealer, reserve inventory, send
        a message or collect money. The record can be cleared with this site’s
        browser storage.
      </p>
      <Link
        className={`${commercePrimaryButton} mt-8`}
        to={`${commerceBasePath}/vehicles`}
      >
        Return to catalogue
      </Link>
    </CommerceLayout>
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
      <dt className="text-emerald-800 dark:text-emerald-300">{label}</dt>
      <dd className="mt-1 font-semibold text-emerald-950 dark:text-white">
        {value}
      </dd>
    </div>
  )
}
