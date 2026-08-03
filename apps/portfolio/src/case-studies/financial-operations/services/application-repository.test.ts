import { beforeEach, describe, expect, it } from 'vitest'
import { createCreditApplication } from '../domain/application'
import {
  BrowserApplicationRepository,
  clearApplicationDrafts,
  readFinancialDraft,
  saveFinancialDraft,
  savePersonalDraft,
} from './application-repository'

describe('browser application repository', () => {
  beforeEach(() => window.localStorage.clear())

  it('persists and retrieves a submitted application', () => {
    const repository = new BrowserApplicationRepository(window.localStorage)
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

    repository.save(application)

    expect(repository.list()).toEqual([application])
    expect(repository.find('application-1')).toEqual(application)
  })

  it('treats malformed storage as an empty queue', () => {
    window.localStorage.setItem(
      'engineering-case-studies.credit-applications.v1',
      'not-json',
    )

    expect(
      new BrowserApplicationRepository(window.localStorage).list(),
    ).toEqual([])
  })

  it('persists and clears both application drafts', () => {
    savePersonalDraft(window.localStorage, { fullName: 'Demo Applicant' })
    saveFinancialDraft(window.localStorage, { requestedAmount: '5000' })

    expect(readFinancialDraft(window.localStorage)).toEqual({
      requestedAmount: '5000',
    })

    clearApplicationDrafts(window.localStorage)

    expect(readFinancialDraft(window.localStorage)).toBeUndefined()
  })
})
