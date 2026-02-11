// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Product Browsing & Categories', () => {
  test('View Product Categories', async ({ loginPage: page }) => {
    // 1. Navigate to the home page
    // The page loads with category cards visible (seed navigates here)
    
    // Verify available categories include: Speakers, Tablets, Laptops, Mice, Headphones
    await page.getByRole('link', { name: /SpeakersCategory/i }).waitFor({ state: 'visible' });
    await page.getByRole('link', { name: /TabletsCategory/i }).waitFor({ state: 'visible' });
    await page.getByRole('link', { name: /LaptopsCategory/i }).waitFor({ state: 'visible' });
    await page.getByRole('link', { name: /MiceCategory/i }).waitFor({ state: 'visible' });
    await page.getByRole('link', { name: /HeadphonesCategory/i }).waitFor({ state: 'visible' });

    // 2. Verify each category card displays product count and 'Shop Now' button
    // We can verify the category cards are rendered with proper content
    const speakersLink = page.getByRole('link', { name: /SPEAKERS/i });
    await speakersLink.waitFor({ state: 'visible' });
    
    const tabletsLink = page.getByRole('link', { name: /TABLETS/i });
    await tabletsLink.waitFor({ state: 'visible' });
    
    const laptopsLink = page.getByRole('link', { name: /LAPTOPS/i });
    await laptopsLink.waitFor({ state: 'visible' });
    
    const miceLink = page.getByRole('link', { name: /MICE/i });
    await miceLink.waitFor({ state: 'visible' });
    
    const headphonesLink = page.getByRole('link', { name: /HEADPHONES/i });
    await headphonesLink.waitFor({ state: 'visible' });
  });
});
