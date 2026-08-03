import { Link, useParams } from 'react-router-dom'
import { formatAmount, formatDate } from '../domain/presentation'
import { BrowserApplicationRepository } from '../services/application-repository'
import { secondaryLinkClassName } from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

const valueLabels: Readonly<Record<string, string>> = {
  employed: 'Employed',
  'self-employed': 'Self-employed',
  student: 'Student',
  other: 'Other',
  'under-25000': 'Under 25,000',
  '25000-49999': '25,000–49,999',
  '50000-74999': '50,000–74,999',
  '75000-plus': '75,000 or more',
  'home-improvement': 'Home improvement',
  education: 'Education',
  vehicle: 'Vehicle',
}

export function ApplicationDetailPage() {
  const { id } = useParams()
  const application = id
    ? new BrowserApplicationRepository(window.localStorage).find(id)
    : undefined

  if (!application) {
    return (
      <FinancialLayout
        description="The record may have been removed from local browser storage."
        eyebrow="Agent workspace"
        title="Application not found"
      >
        <Link
          className={`${secondaryLinkClassName} mt-8`}
          to={`${financialBasePath}/operations`}
        >
          Return to dashboard
        </Link>
      </FinancialLayout>
    )
  }

  return (
    <FinancialLayout
      description="Every value below was supplied through the fictional applicant form and is stored only in this browser."
      eyebrow="Agent verification"
      title={`Review ${application.personal.fullName}`}
    >
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Awaiting verification
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Submitted {formatDate(application.submittedAt)}
        </span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <DetailSection title="Applicant details">
          <Detail label="Full name" value={application.personal.fullName} />
          <Detail label="Email address" value={application.personal.email} />
          <Detail label="Phone number" value={application.personal.phone} />
          <Detail
            label="Date of birth"
            value={application.personal.dateOfBirth}
          />
        </DetailSection>
        <DetailSection title="Financial declaration">
          <Detail
            label="Employment status"
            value={label(application.financial.employmentStatus)}
          />
          <Detail
            label="Annual income range"
            value={label(application.financial.annualIncomeRange)}
          />
          <Detail
            label="Requested amount"
            value={formatAmount(application.financial.requestedAmount)}
          />
          <Detail
            label="Intended use"
            value={label(application.financial.purpose)}
          />
          <Detail
            label="Fictional-data consent"
            value={
              application.financial.consentGiven ? 'Confirmed' : 'Not confirmed'
            }
          />
        </DetailSection>
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          Status history
        </h2>
        <ol className="mt-5 space-y-3">
          {application.statusHistory.map((event) => (
            <li
              className="flex flex-wrap justify-between gap-3 border-b border-slate-100 pb-3 text-sm dark:border-slate-800"
              key={`${event.status}-${event.occurredAt}`}
            >
              <span className="font-medium text-slate-900 dark:text-white">
                Awaiting verification
              </span>
              <time
                className="text-slate-500 dark:text-slate-400"
                dateTime={event.occurredAt}
              >
                {formatDate(event.occurredAt)}
              </time>
            </li>
          ))}
        </ol>
      </section>

      <aside className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
        Verification decisions and notes belong to the next increment. This
        first vertical slice proves submission, queueing and complete data
        review.
      </aside>
      <Link
        className={`${secondaryLinkClassName} mt-8`}
        to={`${financialBasePath}/operations`}
      >
        Back to applications
      </Link>
    </FinancialLayout>
  )
}

function DetailSection({
  title,
  children,
}: {
  readonly title: string
  readonly children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
        {title}
      </h2>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2">{children}</dl>
    </section>
  )
}

function Detail({
  label: detailLabel,
  value,
}: {
  readonly label: string
  readonly value: string
}) {
  return (
    <div>
      <dt className="text-sm text-slate-500 dark:text-slate-400">
        {detailLabel}
      </dt>
      <dd className="mt-1 break-words font-medium text-slate-900 dark:text-white">
        {value}
      </dd>
    </div>
  )
}

function label(value: string): string {
  return valueLabels[value] ?? value
}
