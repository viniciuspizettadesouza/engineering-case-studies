import { expect, test } from '@playwright/test'

test('the collection and a planned study can be explored', async ({ page }) => {
  await page.goto('/engineering-case-studies/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Engineering lessons',
  )
  await expect(
    page.getByRole('heading', { name: /five products/i }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Accessible Transit Platform' }).click()

  await expect(page).toHaveURL(/#\/case-studies\/accessible-transit-platform$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Accessible Transit Platform',
  )
  await expect(page.getByText('Planning state.')).toBeVisible()
})

test('the core navigation is keyboard accessible', async ({ page }) => {
  await page.goto('/engineering-case-studies/')
  await page.keyboard.press('Tab')

  await expect(
    page.getByRole('button', { name: 'Skip to main content' }),
  ).toBeFocused()
})

test('financial form errors receive focus and link to their fields', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/financial-operations-platform/apply/personal',
  )

  await page
    .getByRole('button', { name: 'Continue to financial details' })
    .click()

  const summary = page.getByRole('alert')
  await expect(summary).toBeFocused()
  await expect(
    summary.getByRole('link', {
      name: 'Enter an email address in the correct format.',
    }),
  ).toHaveAttribute('href', '#email')
})

test('an application can be submitted and reviewed by an agent', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/financial-operations-platform/apply/personal',
  )

  await page.getByLabel('Full name').fill('Demo Applicant')
  await page.getByLabel('Email address').fill('demo@example.test')
  await page.getByLabel('Phone number').fill('0000000000')
  await page.getByLabel('Date of birth').fill('1990-01-01')
  await page
    .getByRole('button', { name: 'Continue to financial details' })
    .click()

  await page.getByLabel('Employment status').selectOption('employed')
  await page.getByLabel('Annual income range').selectOption('25000-49999')
  await page.getByLabel('Requested amount').fill('5000')
  await page.getByLabel('Intended use').selectOption('education')
  await page.getByLabel(/all information entered is fictional/i).check()
  await page.getByRole('link', { name: 'Back' }).click()

  await expect(page.getByLabel('Full name')).toHaveValue('Demo Applicant')
  await page
    .getByRole('button', { name: 'Continue to financial details' })
    .click()
  await expect(page.getByLabel('Requested amount')).toHaveValue('5000')
  await page.getByLabel(/simulate one recoverable submission failure/i).check()
  await page.getByRole('button', { name: 'Submit for verification' }).click()

  await expect(
    page.getByRole('heading', { name: 'The application was not submitted' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Retry submission' }).click()

  await expect(
    page.getByRole('heading', { name: 'Awaiting verification' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Open agent dashboard' }).click()

  const reviewLink = page.getByRole('link', {
    name: 'Review application from Demo Applicant',
  })
  await expect(reviewLink).toBeVisible()
  await reviewLink.click()

  await expect(
    page.getByRole('heading', { name: 'Review Demo Applicant' }),
  ).toBeVisible()
  await expect(page.getByText('demo@example.test')).toBeVisible()
  await expect(page.getByText('£5,000')).toBeVisible()
  await expect(page.getByText('Education')).toBeVisible()

  await page.getByLabel('Review note').fill('Fictional details checked.')
  await page.getByRole('button', { name: 'Save decision' }).click()
  await expect(page.getByText(/application has been reviewed/i)).toBeVisible()
  await expect(page.getByText('Fictional details checked.')).toBeVisible()

  await page.getByRole('link', { name: 'Back to applications' }).click()
  await page.getByLabel('Status').selectOption('verified')
  const filteredReviewLink = page.getByRole('link', {
    name: 'Review application from Demo Applicant',
  })
  await expect(filteredReviewLink).toBeVisible()
  await expect(
    filteredReviewLink.locator(
      'xpath=ancestor::*[self::article or self::tr][1]',
    ),
  ).toContainText('Verified')

  await page.getByLabel('Demo service state').selectOption('error')
  await expect(
    page.getByRole('heading', { name: 'Applications could not be loaded' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Retry loading' }).click()
  await expect(filteredReviewLink).toBeVisible()
})
