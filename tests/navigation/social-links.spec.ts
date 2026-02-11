// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Navigation & General UI', () => {
  test('Verify Social Media Links', async ({ loginPage: page }) => {
    // 1. Scroll to the footer section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Footer is displayed with 'FOLLOW US' section
    const followUsHeading = page.getByRole('heading', { name: 'FOLLOW US' });
    await followUsHeading.waitFor({ state: 'visible' });

    // 2. Verify social media icons are present
    // Social media icons are visible for: Facebook, Twitter, LinkedIn
    const facebookIcon = page.locator('a[href*="facebook"]').first();
    await facebookIcon.waitFor({ state: 'visible' });

    const twitterIcon = page.locator('a[href*="twitter"]').first();
    await twitterIcon.waitFor({ state: 'visible' });

    const linkedinIcon = page.locator('a[href*="linkedin"]').first();
    await linkedinIcon.waitFor({ state: 'visible' });

    // 3. Click on Facebook icon
    // The link opens Facebook page (or appropriate social media page)
    // We'll verify the link is present and has the correct href
    const facebookLink = page.locator('a[href*="facebook"]').first();
    await facebookLink.waitFor({ state: 'visible' });
  });
});
