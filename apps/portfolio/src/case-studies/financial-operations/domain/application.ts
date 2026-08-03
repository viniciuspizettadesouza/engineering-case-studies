export const applicationStatuses = [
  'awaiting_verification',
  'verified',
  'needs_information',
] as const

export type ApplicationStatus = (typeof applicationStatuses)[number]

export interface PersonalDetails {
  readonly fullName: string
  readonly email: string
  readonly phone: string
  readonly dateOfBirth: string
}

export interface FinancialDetails {
  readonly employmentStatus: string
  readonly annualIncomeRange: string
  readonly requestedAmount: number
  readonly purpose: string
  readonly consentGiven: boolean
}

export interface StatusEvent {
  readonly status: ApplicationStatus
  readonly occurredAt: string
}

export interface CreditApplication {
  readonly id: string
  readonly submittedAt: string
  readonly status: ApplicationStatus
  readonly personal: PersonalDetails
  readonly financial: FinancialDetails
  readonly statusHistory: readonly StatusEvent[]
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validatePersonalDetails(
  details: PersonalDetails,
): FieldErrors<PersonalDetails> {
  const errors: FieldErrors<PersonalDetails> = {}

  if (details.fullName.trim().length < 2) {
    errors.fullName = 'Enter a name with at least two characters.'
  }

  if (!emailPattern.test(details.email.trim())) {
    errors.email = 'Enter an email address in the correct format.'
  }

  if (details.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number with at least seven digits.'
  }

  if (!details.dateOfBirth) {
    errors.dateOfBirth = 'Enter a date of birth.'
  }

  return errors
}

export interface FinancialFormValues {
  readonly employmentStatus: string
  readonly annualIncomeRange: string
  readonly requestedAmount: string
  readonly purpose: string
  readonly consentGiven: boolean
}

export function validateFinancialDetails(
  details: FinancialFormValues,
): FieldErrors<FinancialFormValues> {
  const errors: FieldErrors<FinancialFormValues> = {}
  const amount = Number(details.requestedAmount)

  if (!details.employmentStatus) {
    errors.employmentStatus = 'Select an employment status.'
  }

  if (!details.annualIncomeRange) {
    errors.annualIncomeRange = 'Select an annual income range.'
  }

  if (!Number.isFinite(amount) || amount < 500 || amount > 25_000) {
    errors.requestedAmount = 'Enter an amount between 500 and 25,000.'
  }

  if (!details.purpose) {
    errors.purpose = 'Select the intended use.'
  }

  if (!details.consentGiven) {
    errors.consentGiven = 'Confirm that the information is fictional.'
  }

  return errors
}

export function createCreditApplication(
  id: string,
  submittedAt: string,
  personal: PersonalDetails,
  financial: FinancialFormValues,
): CreditApplication {
  return {
    id,
    submittedAt,
    status: 'awaiting_verification',
    personal,
    financial: {
      ...financial,
      requestedAmount: Number(financial.requestedAmount),
    },
    statusHistory: [
      { status: 'awaiting_verification', occurredAt: submittedAt },
    ],
  }
}

export function hasErrors<T extends object>(errors: FieldErrors<T>): boolean {
  return Object.keys(errors).length > 0
}
