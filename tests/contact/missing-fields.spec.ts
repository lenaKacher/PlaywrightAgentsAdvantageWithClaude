// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Contact Form', () => {
  test('Submit Contact Form with Missing Required Fields', async ({ page }) => {
    // 1. Navigate to Contact Form
    const contactLink = page.getByRole('link', { name: 'CONTACT US' });
    await contactLink.click();

    // Contact form is displayed
    const contactForm = page.locator('//heading[contains(text(), "CONTACT")]').first();
    await contactForm.waitFor({ state: 'visible' });

    // 2. Leave Email field empty and click SEND
    const sendBtn = page.getByRole('button', { name: /SEND/i });
    await sendBtn.click();

    // Form validation error appears indicating Email is required
    // Form is not submitted

    // 3. Fill Email but leave Subject empty and click SEND
    const emailInput = page.getByRole('textbox', { name: /email|mail/i });
    await emailInput.fill('test@example.com');

    await sendBtn.click();

    // Validation error appears for Subject field
    // Form is not submitted
  });
});
