// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Navigation & General UI', () => {
  test('Navigate Using Breadcrumbs', async ({ loginPage: page }) => {
    // 1. Navigate to a product detail page
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();

    // Breadcrumb navigation is visible showing: HOME / CATEGORY / PRODUCT
    const homeBreadcrumb = page.getByRole('link', { name: /HOME/i });
    await homeBreadcrumb.waitFor({ state: 'visible' });

    const categoryBreadcrumb = page.getByRole('link', { name: /SPEAKERS/i });
    await categoryBreadcrumb.waitFor({ state: 'visible' });

    // 2. Click on 'HOME' in breadcrumb
    await homeBreadcrumb.click();

    // User is redirected to home page
    const homeHeading = page.getByRole('heading', { name: /SPEAKERS|Category/, level: 1 }).first();
    await homeHeading.waitFor({ state: 'visible' });

    // 3. Navigate to product page again and click on category in breadcrumb
    await page.getByRole('link', { name: 'SpeakersCategory', exact: true }).click();
    await page.getByText('Bose Soundlink Bluetooth Speaker III').click();

    const categoryBread = page.getByRole('link', { name: /SPEAKERS/i });
    await categoryBread.click();

    // User is redirected to the category page
    await page.getByRole('heading', { name: 'SPEAKERS', level: 3 }).waitFor({ state: 'visible' });
  });
});
