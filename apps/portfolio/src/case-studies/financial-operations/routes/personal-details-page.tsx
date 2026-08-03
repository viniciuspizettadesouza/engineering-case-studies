import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  hasErrors,
  validatePersonalDetails,
  type PersonalDetails,
} from '../domain/application'
import {
  readPersonalDraft,
  savePersonalDraft,
} from '../services/application-repository'
import {
  ErrorSummary,
  InputField,
  primaryButtonClassName,
  StepIndicator,
} from '../components/form-controls'
import { FinancialLayout } from './financial-layout'
import { financialBasePath } from './route-paths'

const emptyDetails: PersonalDetails = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
}

function getInitialDetails(): PersonalDetails {
  const draft = readPersonalDraft(window.localStorage)

  if (!draft || typeof draft !== 'object') return emptyDetails

  return { ...emptyDetails, ...(draft as Partial<PersonalDetails>) }
}

export function PersonalDetailsPage() {
  const navigate = useNavigate()
  const [details, setDetails] = useState(getInitialDetails)
  const [errors, setErrors] = useState(validatePersonalDetails(emptyDetails))
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const visibleErrors = submitted ? errors : {}
  const errorEntries = Object.entries(visibleErrors).map(
    ([field, message]) => ({
      field,
      message,
    }),
  )

  const update = (field: keyof PersonalDetails, value: string) => {
    const next = { ...details, [field]: value }
    setDetails(next)
    if (submitted) setErrors(validatePersonalDetails(next))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validatePersonalDetails(details)
    setSubmitted(true)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    savePersonalDraft(window.localStorage, details)
    void navigate(`${financialBasePath}/apply/financial`)
  }

  return (
    <FinancialLayout
      description="Start a fictional application. Do not enter real personal or financial information."
      eyebrow="Credit application"
      title="Tell us about the fictional applicant"
    >
      <StepIndicator current={1} />
      <form className="mt-6 max-w-2xl space-y-6" noValidate onSubmit={submit}>
        <ErrorSummary errors={errorEntries} summaryRef={summaryRef} />
        <InputField
          autoComplete="name"
          error={visibleErrors.fullName}
          id="fullName"
          label="Full name"
          onChange={(event) => update('fullName', event.target.value)}
          value={details.fullName}
        />
        <InputField
          autoComplete="email"
          error={visibleErrors.email}
          id="email"
          label="Email address"
          onChange={(event) => update('email', event.target.value)}
          type="email"
          value={details.email}
        />
        <InputField
          autoComplete="tel"
          error={visibleErrors.phone}
          id="phone"
          label="Phone number"
          onChange={(event) => update('phone', event.target.value)}
          type="tel"
          value={details.phone}
        />
        <InputField
          autoComplete="bday"
          error={visibleErrors.dateOfBirth}
          id="dateOfBirth"
          label="Date of birth"
          onChange={(event) => update('dateOfBirth', event.target.value)}
          type="date"
          value={details.dateOfBirth}
        />
        <button className={primaryButtonClassName} type="submit">
          Continue to financial details
        </button>
      </form>
    </FinancialLayout>
  )
}
