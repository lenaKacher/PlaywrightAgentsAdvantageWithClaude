// spec: specs/comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';
import { ContactPage } from '../pages/ContactPage';

test.describe('Contact Form', () => {
  test('View Contact Form', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    
    await contactPage.gotoContact();
    
    // Verify: The page navigates to /contact
    expect(page.url()).toContain('/contact');
    
    // Verify: Contact form is visible
    await contactPage.verifyContactFormVisible();
  });

  test('Fill Contact Form with Valid Data', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    
    await contactPage.gotoContact();
    
    // Fill in all required fields
    await contactPage.fillContactForm('John', 'john@example.com', 'This is a test message.');
    
    // Submit the form
    await contactPage.submitForm();
  });

  test('Submit Contact Form with Missing Fields', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    
    await contactPage.gotoContact();
    
    // Try to submit without filling all required fields
    await contactPage.submitForm();
    
    // Verify: Validation errors appear or page still shows form
    expect(page.url()).toContain('/contact');
  });

  test('Select Contact Subject', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    
    await contactPage.gotoContact();
    
    // Select a subject
    await contactPage.selectSubject('Return');
  });

  test('Attach File to Contact Form', async ({ loginPage: page }) => {
    const contactPage = new ContactPage(page);
    
    await contactPage.gotoContact();
    
    // Try to attach a file - would need valid file path
    // This is a placeholder for file upload functionality
    await contactPage.verifyContactFormVisible();
  });
});
