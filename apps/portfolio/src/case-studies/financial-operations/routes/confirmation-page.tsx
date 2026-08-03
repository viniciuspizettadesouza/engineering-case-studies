import { Link, useParams } from 'react-router-dom'
import { BrowserApplicationRepository } from '../services/application-repository'
import {
  primaryButtonClassName,
  secondaryLinkClassName,
} from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

export function ConfirmationPage() {
  const { id } = useParams()
  const application = id
    ? new BrowserApplicationRepository(window.localStorage).find(id)
    : undefined

  if (!application) {
    return (
      <FinancialLayout
        description="The application may have been removed from this browser."
        eyebrow="Application not found"
        title="We could not find that submission"
      >
        <Link
          className={`${primaryButtonClassName} mt-8`}
          to={`${financialBasePath}/apply/personal`}
        >
          Start a new application
        </Link>
      </FinancialLayout>
    )
  }

  return (
    <FinancialLayout
      description="The fictional application is now available in the simulated agent dashboard."
      eyebrow="Application submitted"
      title="Awaiting verification"
    >
      <section className="mt-8 max-w-2xl rounded-2xl border border-teal-300 bg-teal-50 p-6 dark:border-teal-800 dark:bg-teal-950/30">
        <h2 className="font-semibold text-slate-950 dark:text-white">
          Submission received
        </h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Reference</dt>
            <dd className="mt-1 break-all font-mono text-slate-900 dark:text-white">
              {application.id}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Status</dt>
            <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
              Awaiting verification
            </dd>
          </div>
        </dl>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className={primaryButtonClassName}
          to={`${financialBasePath}/operations`}
        >
          Open agent dashboard
        </Link>
        <Link
          className={secondaryLinkClassName}
          to={`${financialBasePath}/apply/personal`}
        >
          Start another application
        </Link>
      </div>
    </FinancialLayout>
  )
}
