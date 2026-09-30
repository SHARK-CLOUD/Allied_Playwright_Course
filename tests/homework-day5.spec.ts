import fs from 'fs';
import path from 'path';
import { test, expect, LoginPage } from '../fixtures';

// ============================================================
// TASK 1

test('Task 1 - loggedInPage fixture opens the account page', async ({ loggedInPage }) => {
  await expect(loggedInPage).toHaveURL(/\/account/);
  await expect(loggedInPage.getByRole('heading', { level: 1 })).toBeVisible();
});

// ============================================================
// TASK 2

test.describe('catalog hooks', () => {
  let suiteStart: number;

  test.beforeAll(() => {
    suiteStart = Date.now();
    console.log(`[catalog hooks] suite started at ${new Date(suiteStart).toISOString()}`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // скриншот прикрепляем только если тест упал
    if (testInfo.status !== testInfo.expectedStatus) {
      await testInfo.attach('failure-screenshot', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    }
  });

  test.afterAll(() => {
    console.log(`[catalog hooks] suite finished in ${Date.now() - suiteStart} ms`);
  });

  test('catalog page loads the product grid', async ({ page }) => {
    await expect(page.locator('h5.card-title').first()).toBeVisible();
    await expect(page.locator('h5.card-title')).toHaveCount(9);
  });
});

// ============================================================
// TASK 3

type LoginCase = {
  name: string;
  email: string;
  password: string;
  expectedResult: string;
};

const csvPath = path.join(__dirname, '..', 'test-data', 'login-cases.csv');
const lines = fs.readFileSync(csvPath, 'utf-8').trim().split(/\r?\n/);
const headers = lines[0].split(',').map((header) => header.trim());

const loginCases: LoginCase[] = lines.slice(1).map((line) => {
const values = line.split(',').map((value) => value.trim());
const record: Record<string, string> = {};

headers.forEach((header, index) => {
  record[header] = values[index];
  });

  return record as LoginCase;
});

for (const loginCase of loginCases) {
  test(`Task 3 - login: ${loginCase.name} (expects ${loginCase.expectedResult})`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(loginCase.email, loginCase.password);

    if (loginCase.expectedResult === 'success') {
      await expect(page).toHaveURL(/\/account/);
    } else {
      await expect(page.getByText('Invalid email or password')).toBeVisible();
    }
  });
}