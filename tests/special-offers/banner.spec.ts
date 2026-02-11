// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Special Offers & Featured Content', () => {
  test('View Special Offer Banner', async ({ page }) => {
    // 1. Navigate to home page
    // Home page loads

    // 2. Verify Special Offer section is visible
    // A featured product banner is displayed with 'SPECIAL OFFER'
    const specialOfferHeading = page.getByRole('heading', { name: 'SPECIAL OFFER' });
    await specialOfferHeading.waitFor({ state: 'visible' });

    // Banner contains product image, name, description, and 'SEE OFFER' button
    const seeOfferBtn = page.getByRole('link', { name: 'SEE OFFER' });
    await seeOfferBtn.waitFor({ state: 'visible' });
  });
});
