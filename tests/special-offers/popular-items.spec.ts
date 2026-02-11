// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Special Offers & Featured Content', () => {
  test('View Popular Items', async ({ page }) => {
    // 1. Navigate to home page
    // Home page loads

    // 2. Scroll to 'POPULAR ITEMS' section
    const popularItemsSection = page.getByRole('heading', { name: 'POPULAR ITEMS' });
    await popularItemsSection.waitFor({ state: 'visible' });

    // A section displaying popular/best-selling products is visible
    // Products show: image, name, and 'View Details' link
    const viewDetailsLinks = page.getByRole('link', { name: 'View Details' });
    const firstViewDetailsLink = viewDetailsLinks.first();
    await firstViewDetailsLink.waitFor({ state: 'visible' });

    // 3. Click 'View Details' on a popular item
    await firstViewDetailsLink.click();

    // Product detail page loads for that product
    const productHeading = page.getByRole('heading', { level: 1 }).first();
    await productHeading.waitFor({ state: 'visible' });
  });
});
