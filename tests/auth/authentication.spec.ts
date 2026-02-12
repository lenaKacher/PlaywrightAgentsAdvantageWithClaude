// Auth tests removed - loginPage fixture handles all authentication

import { test } from '../fixture/loginPage';

test.describe('User Authentication', () => {
  test.skip('Authentication tests not applicable', () => {
    // Auth tests are skipped because loginPage fixture already handles authentication
    // Users are logged in at the start of each test
  });
});

