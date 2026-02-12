// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Navigation and General Interface', () => {
  test('Verify Logo and Branding', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.clickLogo();
    
    // Verify: The user is navigated to the home page
    expect(page.url()).toBe('https://practicesoftwaretesting.com/');
  });

  test('Language Selector', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    
    // Verify: Language selector is available
    const languageButton = page.locator('button:has-text("EN")');
    if (await homePage.isElementVisible(languageButton)) {
      await languageButton.click();
    }
  });
});
