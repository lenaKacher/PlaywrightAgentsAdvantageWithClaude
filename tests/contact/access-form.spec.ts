// spec: specs/test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../fixture/loginPage';

test.describe('Contact Form', () => {
  test('Access Contact Form', async ({ page }) => {
    // 1. Click on 'CONTACT US' link in the header
    const contactLink = page.getByRole('link', { name: 'CONTACT US' });
    await contactLink.waitFor({ state: 'visible' });
    await contactLink.click();

    // The Contact Us form is displayed
    const contactForm = page.locator('//heading[contains(text(), "CONTACT")]').first();
    await contactForm.waitFor({ state: 'visible' });

    // Form fields are visible and accessible
    const categorySelect = page.locator('select, [role="listbox"]').first();
    await categorySelect.waitFor({ state: 'visible' });
  });
});
