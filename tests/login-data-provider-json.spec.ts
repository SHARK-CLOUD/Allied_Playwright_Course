import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: string;
};

const jsonPath = path.join(__dirname, '..', 'test-data', 'login.json');
const loginCases: LoginCase[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

for (const loginCase of loginCases) {
  test(`login from JSON: ${loginCase.name} (expects ${loginCase.expectedResult})`, async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.locator('[data-test="email"]').fill(loginCase.email);
    await page.locator('[data-test="password"]').fill(loginCase.password);
    await page.locator('[data-test="login-submit"]').click();

    if (loginCase.expectedResult === 'success') {
      await expect(page).toHaveURL(/\/account/);
    } else {
      await expect(page.getByText('Invalid email or password')).toBeVisible();
    }
  });
}
