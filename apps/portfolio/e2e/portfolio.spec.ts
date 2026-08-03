import { expect, test } from '@playwright/test'

test('the collection and a completed study can be explored', async ({
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
  await expect(page.getByText('MVP complete.')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Open bulk catalogue' }),
  ).toBeVisible()
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

test('bulk catalogue rows stay tenant-scoped and accepted products can be published', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/modular-enterprise-workspace/catalogue/northstar',
  )

  await expect(
    page.getByRole('heading', { name: 'Import and validate products' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Preview and validate' }).click()

  const summary = page.getByRole('alert')
  await expect(summary).toBeFocused()
  await expect(summary.getByRole('link').first()).toHaveAttribute(
    'href',
    '#row-2-sku',
  )
  await expect(page.getByLabel('Row 2 SKU')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(
    page.getByText('2 total · 1 accepted · 1 rejected'),
  ).toBeVisible()

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export 1 rejected row' }).focus()
  await page.keyboard.press('Enter')
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('northstar-rejected-products.csv')

  await page.getByLabel('Retail tenant').selectOption('bluehaven')
  await expect(page).toHaveURL(/catalogue\/bluehaven$/)
  await expect(
    page.getByText(/Required columns:.*package_size\./),
  ).toBeVisible()
  await expect(page.getByText(/2 total/)).not.toBeVisible()

  await page.getByLabel('Retail tenant').selectOption('northstar')
  await expect(
    page.getByText('2 total · 1 accepted · 1 rejected'),
  ).toBeVisible()
  const failureToggle = page.getByLabel(
    /simulate one catalogue service failure/i,
  )
  await failureToggle.focus()
  await page.keyboard.press('Space')
  await page.getByRole('button', { name: 'Publish 1 accepted product' }).focus()
  await page.keyboard.press('Enter')
  const publicationAlert = page
    .getByRole('alert')
    .filter({ hasText: 'catalogue service' })
  await expect(publicationAlert).toBeFocused()
  await expect(publicationAlert).toContainText('draft is safe')
  await failureToggle.focus()
  await page.keyboard.press('Space')
  await page.getByRole('button', { name: 'Publish 1 accepted product' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText(
    '1 accepted product published for Northstar Market',
  )
  await expect(page.getByRole('status')).toContainText(
    '1 rejected row stayed in the draft',
  )
})

test('bulk catalogue accepts an uploaded CSV and supports inline correction', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/modular-enterprise-workspace/catalogue/bluehaven',
  )
  await page.getByRole('tab', { name: 'Upload CSV' }).click()
  await page.getByLabel('Product CSV file').setInputFiles({
    name: 'bluehaven-products.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from(
      'sku,name,description,category,price,currency,package_size\nBHG-3001,Coast towel,A fictional quick dry trail towel,Outdoor,19.90,EUR,large',
    ),
  })

  await expect(page.getByRole('alert')).toBeFocused()
  await expect(page.getByLabel('Row 1 Package size')).toHaveAttribute(
    'aria-describedby',
    'row-1-tenantValue-error',
  )
  await page.getByLabel('Row 1 Package size').fill('2pack')
  await expect(
    page.getByText('Every row is ready for simulated publishing.'),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Publish 1 accepted product' }),
  ).toBeEnabled()
})

test('retail insights stay consistent and preserve data when analysis fails', async ({
  page,
}) => {
  await page.goto(
    '/engineering-case-studies/#/case-studies/retail-insights-workspace/insights',
  )
  await expect(
    page.getByRole('heading', { name: 'Daily retail insights' }),
  ).toBeVisible()
  await page.getByLabel('Demo service state').selectOption('loading')
  await expect(page.getByRole('status')).toContainText('Loading')
  await page.getByLabel('Demo service state').selectOption('empty')
  await expect(
    page.getByRole('heading', { name: 'No data for this selection' }),
  ).toBeVisible()
  await page.getByLabel('Demo service state').selectOption('ready')
  await expect(page.getByText('£46,280')).toBeVisible()
  await page.getByLabel('View', { exact: true }).selectOption('harbour')
  await expect(page.getByText('£18,420', { exact: true })).toBeVisible()
  await page
    .getByRole('button', { name: 'Harbour Row sales increased' })
    .click()
  await expect(page.getByText(/does not account for promotions/)).toBeVisible()
  await expect(
    page.getByRole('table', { name: 'Category data table' }),
  ).toBeVisible()
  await page.getByLabel('Demo service state').selectOption('failure')
  await expect(page.getByRole('alert')).toContainText(
    'underlying sales overview remains available',
  )
  await expect(page.getByText('£18,420', { exact: true })).toBeVisible()
  await page.getByLabel('Reporting date').selectOption('2027-06-17')
  await expect(page.getByRole('status')).toContainText('Stale snapshot')
})
