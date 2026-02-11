// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Search Functionality', () => {
  test('Search Special Characters', async ({ page }) => {
    // 1. Click on Search icon
    const searchBox = page.getByRole('textbox', { name: /Search/i });
    await searchBox.waitFor({ state: 'visible' });

    // Search box is active

    // 2. Type special characters like '@#$%' and press Enter
    await searchBox.fill('@#$%');
    await page.press('input[placeholder*="Search"]', 'Enter');

    // The search either returns no results or handles gracefully
    // No errors crash the application
    
    // Verify page is still functional
    const logo = page.locator('link[href*="#/"]').first();
    await logo.waitFor({ state: 'visible' });
  });
});
