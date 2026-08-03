import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  commerceAnalytics,
  filterVehicles,
  type CatalogueFilters,
} from '../domain/reservation'
import { vehicleLocations, vehicles } from '../fixtures/vehicles'
import {
  CommerceLayout,
  commerceSecondaryButton,
} from '../components/commerce-layout'
import { VehicleCard } from '../components/vehicle-card'
import { SelectField } from '../components/form-controls'
import { commerceBasePath } from './route-paths'

type CatalogueState = 'ready' | 'loading' | 'error'

export function CataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [catalogueState, setCatalogueState] = useState<CatalogueState>('ready')
  const filters: CatalogueFilters = {
    location: searchParams.get('location') ?? '',
    sleeps: searchParams.get('sleeps') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
  }
  const results = filterVehicles(vehicles, filters)

  const updateFilter = (field: keyof CatalogueFilters, value: string) => {
    const next = { ...filters, [field]: value }
    const params = new URLSearchParams()
    for (const [key, filterValue] of Object.entries(next)) {
      if (filterValue) params.set(key, filterValue)
    }
    setSearchParams(params)
    commerceAnalytics.record({
      name: 'catalogue_filter_applied',
      properties: next,
    })
  }

  return (
    <CommerceLayout
      description="Explore six invented campers. Prices, locations, specifications and availability exist only for this demonstration."
      eyebrow="Fictional vehicle catalogue"
      title="Find a vehicle for the road ahead"
    >
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
        <form
          aria-label="Filter vehicles"
          className="grid gap-5 md:grid-cols-3"
        >
          <SelectField
            id="location"
            label="Collection location"
            onChange={(event) => updateFilter('location', event.target.value)}
            value={filters.location}
          >
            <option value="">All locations</option>
            {vehicleLocations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </SelectField>
          <SelectField
            id="sleeps"
            label="Minimum sleeping capacity"
            onChange={(event) => updateFilter('sleeps', event.target.value)}
            value={filters.sleeps}
          >
            <option value="">Any capacity</option>
            <option value="2">2 people</option>
            <option value="4">4 people</option>
            <option value="6">6 people</option>
          </SelectField>
          <SelectField
            id="maxPrice"
            label="Maximum daily price"
            onChange={(event) => updateFilter('maxPrice', event.target.value)}
            value={filters.maxPrice}
          >
            <option value="">Any price</option>
            <option value="90">Up to £90</option>
            <option value="130">Up to £130</option>
            <option value="150">Up to £150</option>
          </SelectField>
        </form>
        <details className="mt-5 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
          <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-200">
            Demonstrate catalogue service states
          </summary>
          <div className="mt-3 max-w-xs">
            <SelectField
              id="catalogueState"
              label="Demo catalogue state"
              onChange={(event) =>
                setCatalogueState(event.target.value as CatalogueState)
              }
              value={catalogueState}
            >
              <option value="ready">Available</option>
              <option value="loading">Loading</option>
              <option value="error">Service error</option>
            </SelectField>
          </div>
        </details>
      </div>

      {catalogueState === 'loading' ? (
        <div
          aria-live="polite"
          className="mt-10 rounded-2xl border border-slate-200 p-8 dark:border-slate-800"
        >
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            Loading fictional vehicles…
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            The deterministic demo is holding the catalogue in its loading
            state.
          </p>
        </div>
      ) : catalogueState === 'error' ? (
        <div
          className="mt-10 rounded-2xl border-2 border-red-600 bg-red-50 p-6 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          role="alert"
        >
          <h2 className="text-xl font-semibold">
            Vehicles could not be loaded
          </h2>
          <p className="mt-2">
            This simulated service error does not affect your selected filters.
          </p>
          <button
            className={`${commerceSecondaryButton} mt-5`}
            onClick={() => setCatalogueState('ready')}
            type="button"
          >
            Retry loading
          </button>
        </div>
      ) : results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
            No vehicles match these filters
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Remove one or more filters to see the complete fictional catalogue.
          </p>
          <Link
            className={`${commerceSecondaryButton} mt-5`}
            to={`${commerceBasePath}/vehicles`}
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <section aria-labelledby="results-heading" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              className="text-2xl font-semibold text-slate-950 dark:text-white"
              id="results-heading"
            >
              {results.length} {results.length === 1 ? 'vehicle' : 'vehicles'}
            </h2>
            <p
              aria-live="polite"
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              Filters are saved in the page address.
            </p>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {results.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                priority={index === 0}
                vehicle={vehicle}
              />
            ))}
          </div>
        </section>
      )}
    </CommerceLayout>
  )
}
