import { test as base, expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email address *');
    this.passwordInput = page.getByLabel('Password *');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    // передаём уже авторизованную страницу в тест
    await use(page);

    // всё, что после use(), — teardown фикстуры (аналог afterEach, но только
    // для неё). Playwright закрывает контекст после каждого теста, поэтому
    // разлогиниваться вручную не нужно.
  },
});

export { expect };