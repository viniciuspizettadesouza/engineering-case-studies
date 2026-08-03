import { Link } from 'react-router-dom'
import type { CreditApplication } from '../domain/application'
import { formatAmount, formatDate } from '../domain/presentation'
import { BrowserApplicationRepository } from '../services/application-repository'
import { primaryButtonClassName } from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

export function OperationsDashboardPage() {
  const applications = new BrowserApplicationRepository(
    window.localStorage,
  ).list()

  return (
    <FinancialLayout
      description="Review applications stored in this browser. This role-aware view is simulated and has no production authentication."
      eyebrow="Agent workspace"
      title="Applications awaiting verification"
    >
      {applications.length === 0 ? (
        <section className="mt-10 max-w-2xl rounded-2xl border border-dashed border-slate-300 p-8 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            No applications yet
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Complete the fictional applicant flow to populate this queue.
          </p>
          <Link
            className={`${primaryButtonClassName} mt-6`}
            to={`${financialBasePath}/apply/personal`}
          >
            Create an application
          </Link>
        </section>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-2xl border-collapse text-left text-sm">
            <caption className="sr-only">Submitted credit applications</caption>
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
      )}
    </FinancialLayout>
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
          Awaiting verification
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
