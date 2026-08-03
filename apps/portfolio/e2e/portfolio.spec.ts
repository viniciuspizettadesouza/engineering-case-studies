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
