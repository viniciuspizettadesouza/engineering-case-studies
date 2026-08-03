import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { reviewApplication, type AgentDecision } from '../domain/application'
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
  const repository = new BrowserApplicationRepository(window.localStorage)
  const [application, setApplication] = useState(() =>
    id ? repository.find(id) : undefined,
  )
  const [decision, setDecision] = useState<AgentDecision>('verified')
  const [note, setNote] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const errorRef = useRef<HTMLDivElement>(null)

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

  const submitReview = (event: FormEvent) => {
    event.preventDefault()
    const result = reviewApplication(
      application,
      decision,
      note,
      new Date().toISOString(),
    )

    if (!result.ok) {
      setReviewError(result.error)
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }

    repository.save(result.application)
    setApplication(result.application)
    setReviewError('')
    setAnnouncement(
      `Application marked ${formatApplicationStatus(result.application.status)}.`,
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
          {formatApplicationStatus(application.status)}
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
                {formatApplicationStatus(event.status)}
              </span>
              <div className="text-right">
                <time
                  className="text-slate-500 dark:text-slate-400"
                  dateTime={event.occurredAt}
                >
                  {formatDate(event.occurredAt)}
                </time>
                {event.note ? (
                  <p className="mt-2 max-w-xl text-slate-700 dark:text-slate-300">
                    {event.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {application.status === 'awaiting_verification' ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
            Record verification decision
          </h2>
          <form className="mt-5 max-w-2xl space-y-5" onSubmit={submitReview}>
            {reviewError ? (
              <div
                className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-sm text-red-950 dark:bg-red-950/30 dark:text-red-100"
                ref={errorRef}
                role="alert"
                tabIndex={-1}
              >
                {reviewError}
              </div>
            ) : null}
            <div>
              <label
                className="block font-medium text-slate-800 dark:text-slate-100"
                htmlFor="decision"
              >
                Decision
              </label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                id="decision"
                onChange={(event) =>
                  setDecision(event.target.value as AgentDecision)
                }
                value={decision}
              >
                <option value="verified">Verify application</option>
                <option value="needs_information">Request information</option>
              </select>
            </div>
            <div>
              <label
                className="block font-medium text-slate-800 dark:text-slate-100"
                htmlFor="reviewNote"
              >
                Review note
              </label>
              <p
                className="mt-1 text-sm text-slate-500 dark:text-slate-400"
                id="reviewNote-hint"
              >
                Required for the audit history. Use fictional information only.
              </p>
              <textarea
                aria-describedby="reviewNote-hint"
                className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                id="reviewNote"
                onChange={(event) => setNote(event.target.value)}
                value={note}
              />
            </div>
            <button className={primaryButtonClassName} type="submit">
              Save decision
            </button>
          </form>
        </section>
      ) : (
        <aside className="mt-8 rounded-xl border border-teal-300 bg-teal-50 p-5 text-sm leading-6 text-teal-950 dark:border-teal-800 dark:bg-teal-950/30 dark:text-teal-100">
          This application has been reviewed. Its decision and required note are
          preserved in the status history.
        </aside>
      )}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
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
  readonly children: ReactNode
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
