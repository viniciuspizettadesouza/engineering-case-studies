import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  filterApplications,
  type ApplicationStatus,
  type CreditApplication,
} from '../domain/application'
import {
  formatApplicationStatus,
  formatAmount,
  formatDate,
} from '../domain/presentation'
import { BrowserApplicationRepository } from '../services/application-repository'
import {
  primaryButtonClassName,
  secondaryLinkClassName,
} from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

type ServiceScenario = 'normal' | 'loading' | 'error' | 'empty'

export function OperationsDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedScenario = searchParams.get('scenario')
  const scenario: ServiceScenario = isServiceScenario(requestedScenario)
    ? requestedScenario
    : 'normal'
  const [status, setStatus] = useState<ApplicationStatus | 'all'>('all')
  const [submittedDate, setSubmittedDate] = useState('')
  const storedApplications = new BrowserApplicationRepository(
    window.localStorage,
  ).list()
  const applications = filterApplications(
    scenario === 'empty' ? [] : storedApplications,
    { status, submittedDate },
  )

  const changeScenario = (value: ServiceScenario) => {
    if (value === 'normal') {
      void setSearchParams({})
      return
    }

    void setSearchParams({ scenario: value })
  }

  return (
    <FinancialLayout
      description="Review applications stored in this browser. This role-aware view is simulated and has no production authentication."
      eyebrow="Agent workspace"
      title="Credit application queue"
    >
      <div className="mt-10 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="statusFilter"
          >
            Status
          </label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            id="statusFilter"
            onChange={(event) =>
              setStatus(event.target.value as ApplicationStatus | 'all')
            }
            value={status}
          >
            <option value="all">All statuses</option>
            <option value="awaiting_verification">Awaiting verification</option>
            <option value="verified">Verified</option>
            <option value="needs_information">Needs information</option>
          </select>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="submittedDateFilter"
          >
            Submission date
          </label>
          <input
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            id="submittedDateFilter"
            onChange={(event) => setSubmittedDate(event.target.value)}
            type="date"
            value={submittedDate}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            htmlFor="serviceScenario"
          >
            Demo service state
          </label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            id="serviceScenario"
            onChange={(event) =>
              changeScenario(event.target.value as ServiceScenario)
            }
            value={scenario}
          >
            <option value="normal">Available</option>
            <option value="loading">Loading</option>
            <option value="error">Service failure</option>
            <option value="empty">Empty queue</option>
          </select>
        </div>
      </div>

      {scenario === 'loading' ? (
        <section
          aria-live="polite"
          className="mt-8 rounded-2xl border border-slate-200 p-8 dark:border-slate-800"
          role="status"
        >
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            Loading applications…
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            This deterministic state demonstrates delayed queue retrieval.
          </p>
        </section>
      ) : scenario === 'error' ? (
        <section
          className="mt-8 rounded-2xl border-2 border-red-600 bg-red-50 p-6 text-red-950 dark:bg-red-950/30 dark:text-red-100"
          role="alert"
        >
          <h2 className="text-xl font-semibold">
            Applications could not be loaded
          </h2>
          <p className="mt-2">
            This simulated service failure does not remove locally stored
            applications.
          </p>
          <button
            className={`${secondaryLinkClassName} mt-5`}
            onClick={() => changeScenario('normal')}
            type="button"
          >
            Retry loading
          </button>
        </section>
      ) : applications.length === 0 ? (
        <EmptyQueue hasFilters={Boolean(submittedDate || status !== 'all')} />
      ) : (
        <>
          <div className="mt-8 space-y-4 sm:hidden">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {applications.length}{' '}
              {applications.length === 1 ? 'application' : 'applications'} shown
            </p>
            {applications.map((application) => (
              <ApplicationCard application={application} key={application.id} />
            ))}
          </div>
          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white sm:block dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full min-w-2xl border-collapse text-left text-sm">
              <caption className="px-5 py-4 text-left text-slate-600 dark:text-slate-300">
                {applications.length}{' '}
                {applications.length === 1 ? 'application' : 'applications'}{' '}
                shown
              </caption>
              <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 font-semibold" scope="col">
                    Applicant
                  </th>
                  <th className="px-5 py-4 font-semibold" scope="col">
                    Requested amount
                  </th>
                  <th className="px-5 py-4 font-semibold" scope="col">
                    Submitted
                  </th>
                  <th className="px-5 py-4 font-semibold" scope="col">
                    Status
                  </th>
                  <th className="px-5 py-4 font-semibold" scope="col">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {applications.map((application) => (
                  <ApplicationRow
                    application={application}
                    key={application.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </FinancialLayout>
  )
}

function EmptyQueue({ hasFilters }: { readonly hasFilters: boolean }) {
  return (
    <section className="mt-8 max-w-2xl rounded-2xl border border-dashed border-slate-300 p-8 dark:border-slate-700">
      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
        {hasFilters
          ? 'No applications match these filters'
          : 'No applications yet'}
      </h2>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
        {hasFilters
          ? 'Change or clear the filters to see other records.'
          : 'Complete the fictional applicant flow to populate this queue.'}
      </p>
      {!hasFilters ? (
        <Link
          className={`${primaryButtonClassName} mt-6`}
          to={`${financialBasePath}/apply/personal`}
        >
          Create an application
        </Link>
      ) : null}
    </section>
  )
}

function ApplicationRow({
  application,
}: {
  readonly application: CreditApplication
}) {
  return (
    <tr>
      <th
        className="px-5 py-4 font-medium text-slate-950 dark:text-white"
        scope="row"
      >
        {application.personal.fullName}
      </th>
      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
        {formatAmount(application.financial.requestedAmount)}
      </td>
      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
        {formatDate(application.submittedAt)}
      </td>
      <td className="px-5 py-4">
        <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          {formatApplicationStatus(application.status)}
        </span>
      </td>
      <td className="px-5 py-4 text-right">
        <Link
          aria-label={`Review application from ${application.personal.fullName}`}
          className="font-semibold text-teal-700 underline underline-offset-4 dark:text-teal-300"
          to={`${financialBasePath}/operations/${application.id}`}
        >
          Review
        </Link>
      </td>
    </tr>
  )
}

function ApplicationCard({
  application,
}: {
  readonly application: CreditApplication
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-semibold text-slate-950 dark:text-white">
          {application.personal.fullName}
        </h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          {formatApplicationStatus(application.status)}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Amount</dt>
          <dd className="mt-1 text-slate-900 dark:text-white">
            {formatAmount(application.financial.requestedAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500 dark:text-slate-400">Submitted</dt>
          <dd className="mt-1 text-slate-900 dark:text-white">
            {formatDate(application.submittedAt)}
          </dd>
        </div>
      </dl>
      <Link
        aria-label={`Review application from ${application.personal.fullName}`}
        className={`${secondaryLinkClassName} mt-5 w-full`}
        to={`${financialBasePath}/operations/${application.id}`}
      >
        Review application
      </Link>
    </article>
  )
}

function isServiceScenario(value: string | null): value is ServiceScenario {
  return (
    value === 'normal' ||
    value === 'loading' ||
    value === 'error' ||
    value === 'empty'
  )
}
