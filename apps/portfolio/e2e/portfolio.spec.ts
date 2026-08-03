import { expect, test } from '@playwright/test'

test('the collection and the next planned study can be explored', async ({
  page,
}) => {
  await page.goto('/engineering-case-studies/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Engineering lessons',
  )
  await expect(
    page.getByRole('heading', { name: /five products/i }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Modular Enterprise Workspace' }).click()

  await expect(page).toHaveURL(/#\/case-studies\/modular-enterprise-workspace$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Modular Enterprise Workspace',
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

test('a vehicle can be filtered, reviewed and reserved after recoverable errors', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/commerce-experience/vehicles',
  )

  await page.getByLabel('Collection location').selectOption('Northbridge')
  await page.getByLabel('Minimum sleeping capacity').selectOption('4')
  await page.getByLabel('Maximum daily price').selectOption('130')
  await expect(page).toHaveURL(/location=Northbridge/)
  await expect(page.getByRole('heading', { name: '1 vehicle' })).toBeVisible()
  await expect(
    page.getByRole('img', { name: /Bramble Four/i }),
  ).toHaveAttribute('src', '/engineering-case-studies/vehicles/bramble.svg')
  const imageResponse = await page.request.get(
    '/engineering-case-studies/vehicles/bramble.svg',
  )
  expect(imageResponse.ok()).toBe(true)
  await page.getByRole('link', { name: 'View Bramble Four' }).click()

  await expect(
    page.getByRole('heading', { name: 'Bramble Four' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Reserve Bramble Four' }).click()

  await page.getByLabel('Collection date').fill('2027-07-03')
  await page.getByLabel('Return date').fill('2027-07-07')
  await page.getByLabel('Full name').fill('Demo Traveller')
  await page.getByLabel('Email address').fill('traveller@example.test')
  await page.getByLabel('Phone number').fill('0000000000')
  await page.getByLabel(/contact details are fictional/i).check()
  await page.getByRole('button', { name: 'Review reservation' }).click()

  const summary = page.getByRole('alert')
  await expect(summary).toBeFocused()
  await expect(summary).toContainText('Those dates are unavailable')
  await expect(page.getByLabel('Full name')).toHaveValue('Demo Traveller')

  await page.getByLabel('Collection date').fill('2027-07-07')
  await page.getByLabel('Return date').fill('2027-07-10')
  await page.getByRole('button', { name: 'Review reservation' }).click()

  await expect(
    page.getByRole('heading', { name: 'Review your reservation request' }),
  ).toBeVisible()
  await expect(page.getByText('traveller@example.test')).toBeVisible()
  await page.getByLabel(/simulate one recoverable submission failure/i).check()
  await page.getByRole('button', { name: 'Submit reservation request' }).click()
  await expect(page.getByRole('alert')).toBeFocused()
  await page.getByRole('button', { name: 'Retry reservation' }).click()

  await expect(
    page.getByRole('heading', { name: 'Your request has been received' }),
  ).toBeVisible()
  await expect(
    page.getByText(/no payment, inventory hold or real reservation occurred/i),
  ).toBeVisible()
  await expect(page.getByText(/WR-[A-F0-9-]+/)).toBeVisible()
})

test('a tenant-scoped accessible journey can produce a simulated ticket', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/accessible-transit-platform/tickets/mossline/plan',
  )

  await expect(
    page.getByRole('heading', { name: 'Where would you like to travel?' }),
  ).toBeVisible()
  await expect(page.getByText('Mossline Transit').first()).toBeVisible()
  await page.getByLabel('Origin').selectOption('fern-quay')

  await page.getByLabel('Transport operator').selectOption('sunmere')
  await expect(page).toHaveURL(/tickets\/sunmere\/plan$/)
  await expect(page.getByLabel('Origin')).toHaveValue('')
  await expect(page.getByLabel('Origin')).toContainText('Ember Cross')
  await expect(page.getByLabel('Origin')).not.toContainText('Fern Quay')

  await page.getByLabel('Transport operator').selectOption('mossline')
  await expect(page.getByLabel('Origin')).toHaveValue('fern-quay')
  await page.getByLabel('Destination').selectOption('mossbank')
  await page.getByLabel('Travel time').selectOption('2027-10-14T07:10')
  await page.getByRole('button', { name: 'Find journeys' }).click()
  await expect(page.getByRole('status')).toContainText('has expired')

  await page.getByLabel('Travel time').selectOption('2027-10-14T09:10')
  await page.getByRole('button', { name: 'Find journeys' }).click()
  await page.getByLabel('Select this journey').check()
  await page.getByRole('button', { name: 'Continue to fares' }).click()

  await expect(
    page.getByRole('group', { name: 'Eligible fares' }),
  ).toBeVisible()
  await page.getByLabel(/Fernwater Flexible/).check()
  await expect(
    page.getByText(/Use the selected service or the next/i),
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Continue to passenger details' })
    .click()

  await page.getByRole('button', { name: 'Review ticket order' }).click()
  await expect(page.getByRole('alert')).toBeFocused()
  await expect(page.getByRole('alert')).toContainText('correct format')
  await page.getByLabel('Passenger name').fill('Demo Passenger')
  await page.getByLabel('Email address').fill('passenger@example.test')
  await page.getByLabel(/fictional assistance request/i).check()
  await page.getByRole('button', { name: 'Review ticket order' }).click()

  await expect(
    page.getByRole('heading', { name: 'Review your fictional ticket' }),
  ).toBeVisible()
  await expect(page.getByText('passenger@example.test')).toBeVisible()
  await page.getByLabel(/simulate one recoverable purchase failure/i).check()
  await page.getByRole('button', { name: 'Simulate ticket purchase' }).click()
  await expect(page.getByRole('alert')).toBeFocused()
  await expect(page.getByRole('alert')).toContainText('not purchased')
  await page.getByRole('button', { name: 'Retry simulated purchase' }).click()

  await expect(
    page.getByRole('heading', { name: 'Your fictional ticket is ready' }),
  ).toBeVisible()
  await expect(page.getByText(/TK-MOS-[A-F0-9-]+/)).toBeVisible()
  await expect(page.getByText('Not valid for travel.')).toBeVisible()
})
