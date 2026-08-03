import { describe, expect, it } from 'vitest'
import {
  createCreditApplication,
  validateFinancialDetails,
  validatePersonalDetails,
} from './application'

describe('financial application domain', () => {
  it('requires valid values on both application steps', () => {
    expect(
      validatePersonalDetails({
        fullName: '',
        email: 'invalid',
        phone: '12',
        dateOfBirth: '',
      }),
    ).toEqual({
      fullName: 'Enter a name with at least two characters.',
      email: 'Enter an email address in the correct format.',
      phone: 'Enter a phone number with at least seven digits.',
      dateOfBirth: 'Enter a date of birth.',
    })

    expect(
      Object.keys(
        validateFinancialDetails({
          employmentStatus: '',
          annualIncomeRange: '',
          requestedAmount: '100',
          purpose: '',
          consentGiven: false,
        }),
      ),
    ).toEqual([
      'employmentStatus',
      'annualIncomeRange',
      'requestedAmount',
      'purpose',
      'consentGiven',
    ])
  })

  it('creates every submission in awaiting verification', () => {
    const application = createCreditApplication(
      'application-1',
      '2026-08-03T12:00:00.000Z',
      {
        fullName: 'Demo Applicant',
        email: 'demo@example.test',
        phone: '0000000000',
        dateOfBirth: '1990-01-01',
      },
      {
        employmentStatus: 'employed',
        annualIncomeRange: '25000-49999',
        requestedAmount: '5000',
        purpose: 'education',
        consentGiven: true,
      },
    )

    expect(application.status).toBe('awaiting_verification')
    expect(application.financial.requestedAmount).toBe(5000)
    expect(application.statusHistory).toEqual([
      {
        status: 'awaiting_verification',
        occurredAt: '2026-08-03T12:00:00.000Z',
      },
    ])
  })
})
