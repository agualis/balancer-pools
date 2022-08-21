import { test, expect } from '@playwright/test'

test('list of pools', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Balancer pools')
  await page.locator('text=BAL 80% WETH 20%').click();

  await expect(page.url()).toContain('/pool');

  await expect(page.url()).toContain('/pool');
})
