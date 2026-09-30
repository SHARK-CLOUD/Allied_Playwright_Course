import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="cart-quantity"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');
    this.sortDropdown = page.getByRole('combobox', { name: 'sort' });
    this.productTitles = page.locator('[data-test="product-name"]');
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  // Открывает товар по имени, добавляет в корзину и возвращается на главную
  async addItemToCart(productName: string): Promise<void> {
    await this.page
      .locator('a.card')
      .filter({ has: this.page.getByRole('heading', { name: productName, exact: true }) })
      .click();
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
    await this.page.getByRole('alert').waitFor();
    await this.goto();
  }
  
  // Открывает корзину и удаляет первую позицию
  async removeItemFromCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.locator('[data-test="product-quantity"]').first().waitFor();
    await this.page.locator('a.btn-danger').first().click();
  }
}