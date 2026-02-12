// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Navigation and General Interface', () => {
  test('Verify Home Page Loads Successfully', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    
    // Verify: The page loads successfully
    expect(page.url()).toBe('https://practicesoftwaretesting.com/');
    
    // Verify: Product listings are visible
    await homePage.verifyHomePageLoaded();
    
    // Verify: Product images load
    await homePage.verifyProductImagesLoad();
  });
});
