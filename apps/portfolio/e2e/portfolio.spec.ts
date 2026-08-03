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
  await page.getByRole('button', { name: 'Submit for verification' }).click()

  await expect(
    page.getByRole('heading', { name: 'Awaiting verification' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Open agent dashboard' }).click()

  await expect(page.getByRole('cell', { name: 'Demo Applicant' })).toBeVisible()
  await page
    .getByRole('link', { name: 'Review application from Demo Applicant' })
    .click()

  await expect(
    page.getByRole('heading', { name: 'Review Demo Applicant' }),
  ).toBeVisible()
  await expect(page.getByText('demo@example.test')).toBeVisible()
  await expect(page.getByText('£5,000')).toBeVisible()
  await expect(page.getByText('Education')).toBeVisible()
})
