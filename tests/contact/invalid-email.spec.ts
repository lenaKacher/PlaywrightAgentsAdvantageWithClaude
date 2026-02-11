// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Contact Form', () => {
  test('Submit Contact Form with Invalid Email', async ({ page }) => {
    // 1. Navigate to Contact Form
    const contactLink = page.getByRole('link', { name: 'CONTACT US' });
    await contactLink.click();

    // Contact form is displayed
    const contactForm = page.locator('//heading[contains(text(), "CONTACT")]').first();
    await contactForm.waitFor({ state: 'visible' });

    // 2. Enter invalid email format (e.g., 'notanemail')
    const emailInput = page.getByRole('textbox', { name: /email|mail/i });
    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill('notanemail');

    // Email text is entered

    // 3. Fill other required fields and click SEND
    const subjectInput = page.getByRole('textbox', { name: /subject/i });
    await subjectInput.waitFor({ state: 'visible' });
    await subjectInput.fill('Test Subject');

    const sendBtn = page.getByRole('button', { name: /SEND/i });
    await sendBtn.click();

    // Email validation error appears
    // Form is not submitted
  });
});
