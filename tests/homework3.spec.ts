import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Test - Adding items to the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await expect(homePage.cartBadge).toHaveCount(0);

  await homePage.addItemToCart('Combination Pliers');
  await homePage.addItemToCart('Bolt Cutters');

  await expect(homePage.cartBadge).toContainText('2');
});

test('Test - Removing an item from the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await homePage.addItemToCart('Combination Pliers');
  await homePage.addItemToCart('Pliers');
  await expect(homePage.cartBadge).toContainText('2');

  await homePage.removeItemFromCart();
  await expect(homePage.cartBadge).toContainText('1');
});