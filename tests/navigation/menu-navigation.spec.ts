// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Navigation and General Interface', () => {
  test('Navigate Between Main Menu Items', async ({ loginPage: page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);
    
    // Start from home
    await homePage.goto();
    
    // Navigate to Hand Tools category
    await homePage.navigateToCategory('Hand Tools');
    expect(page.url()).toContain('/category/hand-tools');
    
    // Verify products are displayed
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    // Navigate to Contact page
    await homePage.goToContact();
    expect(page.url()).toContain('/contact');
    
    // Verify contact form is visible
    await contactPage.verifyContactFormVisible();
    
    // Navigate back to home
    await homePage.goto();
    expect(page.url()).toContain('practicesoftwaretesting.com');
    
    // Verify products are displayed
    await homePage.verifyHomePageLoaded();
  });
});
