import { test, expect } from '@playwright/test';

test('Task 1 - Search for pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/'); 
  await page.getByRole('textbox', { name: 'Search' }).dblclick();
  await page.getByRole('textbox', { name: 'Search' }).fill('Pliers');
  await expect(page.getByRole('textbox', { name: 'Search' })).toHaveValue('Pliers');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('h5.card-title')).toHaveCount(4);
});


test('Task 2 - Filter the catalog to hammers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByLabel('Hammer').check();
  await expect(page.getByLabel('Hammer')).toBeChecked();
  await expect(page.locator('h5.card-title')).toHaveCount(7);
  await page.getByLabel('Hammer').uncheck();  
  await expect(page.getByLabel('Hammer')).not.toBeChecked();
});

test('Task 3 - Sort products by name', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('combobox', { name: 'sort' }).selectOption('name,asc');
  await expect(page.locator('h5.card-title')).toHaveCount(9);
  await expect(page.locator('[data-test="product-name"]').first()).toContainText("Adjustable Wrench");
  await expect(page.locator('[data-test="product-name"]').first()).toHaveClass("card-title");
});

test('Task 4 - Inspect a product and add two items to the cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('link', { name: "Combination Pliers" }).click();
  await expect(page.locator('h1:has-text("Combination Pliers")')).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue('1');
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue('2');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
  await expect(page.locator('[data-test="cart-quantity"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-quantity"]')).toContainText('2');
});