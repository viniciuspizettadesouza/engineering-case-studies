import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createCreditApplication,
  hasErrors,
  validateFinancialDetails,
  validatePersonalDetails,
  type FieldErrors,
  type FinancialFormValues,
  type PersonalDetails,
} from '../domain/application'
import {
  BrowserApplicationRepository,
  clearPersonalDraft,
  readPersonalDraft,
} from '../services/application-repository'
import {
  ErrorSummary,
  InputField,
  primaryButtonClassName,
  secondaryLinkClassName,
  SelectField,
  StepIndicator,
} from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

const emptyFinancialDetails: FinancialFormValues = {
  employmentStatus: '',
  annualIncomeRange: '',
  requestedAmount: '',
  purpose: '',
  consentGiven: false,
}

function getPersonalDraft(): PersonalDetails | undefined {
  const draft = readPersonalDraft(window.localStorage)

  if (!draft || typeof draft !== 'object') return undefined

  const details = draft as PersonalDetails
  return hasErrors(validatePersonalDetails(details)) ? undefined : details
}

export function FinancialDetailsPage() {
  const navigate = useNavigate()
  const [personal] = useState(getPersonalDraft)
  const [details, setDetails] = useState(emptyFinancialDetails)
  const [errors, setErrors] = useState<FieldErrors<FinancialFormValues>>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  if (!personal) {
    return (
      <FinancialLayout
        description="Complete the first page before adding financial information."
        eyebrow="Credit application"
        title="Personal details are required"
      >
        <Link
          className={`${primaryButtonClassName} mt-8`}
          to={`${financialBasePath}/apply/personal`}
        >
          Go to step one
        </Link>
      </FinancialLayout>
    )
  }

  const visibleErrors = submitted ? errors : {}
  const errorEntries = Object.entries(visibleErrors).map(
    ([field, message]) => ({
      field,
      message,
    }),
  )

  const update = (
    field: keyof FinancialFormValues,
    value: string | boolean,
  ) => {
    const next = { ...details, [field]: value }
    setDetails(next)
    if (submitted) setErrors(validateFinancialDetails(next))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateFinancialDetails(details)
    setSubmitted(true)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    const id = crypto.randomUUID()
    const application = createCreditApplication(
      id,
      new Date().toISOString(),
      personal,
      details,
    )
    new BrowserApplicationRepository(window.localStorage).save(application)
    clearPersonalDraft(window.localStorage)
    void navigate(`${financialBasePath}/confirmation/${id}`)
  }

  return (
    <FinancialLayout
      description="Choose invented values for this demonstration. Submission sends the application to the simulated agent queue."
      eyebrow="Credit application"
      title="Add financial details and submit"
    >
      <StepIndicator current={2} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <form className="space-y-6" noValidate onSubmit={submit}>
          <ErrorSummary errors={errorEntries} summaryRef={summaryRef} />
          <SelectField
            error={visibleErrors.employmentStatus}
            id="employmentStatus"
            label="Employment status"
            onChange={(event) => update('employmentStatus', event.target.value)}
            value={details.employmentStatus}
          >
            <option value="">Select an option</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-employed</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </SelectField>
          <SelectField
            error={visibleErrors.annualIncomeRange}
            id="annualIncomeRange"
            label="Annual income range"
            onChange={(event) =>
              update('annualIncomeRange', event.target.value)
            }
            value={details.annualIncomeRange}
          >
            <option value="">Select an option</option>
            <option value="under-25000">Under 25,000</option>
            <option value="25000-49999">25,000–49,999</option>
            <option value="50000-74999">50,000–74,999</option>
            <option value="75000-plus">75,000 or more</option>
          </SelectField>
          <InputField
            error={visibleErrors.requestedAmount}
            id="requestedAmount"
            inputMode="numeric"
            label="Requested amount"
            max="25000"
            min="500"
            onChange={(event) => update('requestedAmount', event.target.value)}
            type="number"
            value={details.requestedAmount}
          />
          <SelectField
            error={visibleErrors.purpose}
            id="purpose"
            label="Intended use"
            onChange={(event) => update('purpose', event.target.value)}
            value={details.purpose}
          >
            <option value="">Select an option</option>
            <option value="home-improvement">Home improvement</option>
            <option value="education">Education</option>
            <option value="vehicle">Vehicle</option>
            <option value="other">Other</option>
          </SelectField>
          <div>
            <div className="flex items-start gap-3">
              <input
                aria-describedby={
                  visibleErrors.consentGiven ? 'consentGiven-error' : undefined
                }
                aria-invalid={Boolean(visibleErrors.consentGiven)}
                checked={details.consentGiven}
                className="mt-1 size-5 accent-teal-700"
                id="consentGiven"
                onChange={(event) =>
                  update('consentGiven', event.target.checked)
                }
                type="checkbox"
              />
              <label
                className="text-sm leading-6 text-slate-700 dark:text-slate-300"
                htmlFor="consentGiven"
              >
                I confirm that all information entered is fictional and may be
                stored in this browser for the demo.
              </label>
            </div>
            {visibleErrors.consentGiven ? (
              <p
                className="mt-2 text-sm font-medium text-red-700 dark:text-red-300"
                id="consentGiven-error"
              >
                {visibleErrors.consentGiven}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className={secondaryLinkClassName}
              to={`${financialBasePath}/apply/personal`}
            >
              Back
            </Link>
            <button className={primaryButtonClassName} type="submit">
              Submit for verification
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-950 dark:text-white">
            Applicant summary
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <SummaryItem label="Name" value={personal.fullName} />
            <SummaryItem label="Email" value={personal.email} />
            <SummaryItem label="Phone" value={personal.phone} />
            <SummaryItem label="Date of birth" value={personal.dateOfBirth} />
          </dl>
        </aside>
      </div>
    </FinancialLayout>
  )
}

function SummaryItem({
  label,
  value,
}: {
  readonly label: string
  readonly value: string
}) {
  return (
    <div>
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-medium text-slate-900 dark:text-white">
        {value}
      </dd>
    </div>
  )
}
