// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Special Offers & Featured Content', () => {
  test('Click Special Offer Product', async ({ page }) => {
    // 1. Navigate to home page
    // Special Offer section is visible

    // 2. Click on 'SEE OFFER' button in Special Offer banner
    const seeOfferBtn = page.getByRole('link', { name: 'SEE OFFER' });
    await seeOfferBtn.waitFor({ state: 'visible' });
    await seeOfferBtn.click();

    // User is taken to the special offer product detail page
    // Product details should be displayed
    const productHeading = page.getByRole('heading', { level: 1 }).first();
    await productHeading.waitFor({ state: 'visible' });
  });
});
