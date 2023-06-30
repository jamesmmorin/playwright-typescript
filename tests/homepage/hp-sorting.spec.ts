import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in.
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('verifies homepage content', async ({ page }) => {

  // Verifying you are on the right page through the URL
  // can verify either full or partial url
  // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
  await expect(page).toHaveURL(/inventory.html/);  

  // verifying there are 6 items for sale on the page
  const list = await page.locator('[class="inventory_item"]');
  await expect(list).toHaveCount(6);

  // selecting sort option from Z to A
  await page.locator('[data-test="product_sort_container"]').selectOption('Name (Z to A)')

  // making sure that the first item sorted in the list is the right item
  await expect(page.locator('//div[@class="inventory_item"][1]')).toContainText('Test.allTheThings() T-Shirt (Red)');

  // sorting items by price, low to high
  await page.locator('[data-test="product_sort_container"]').selectOption('Price (low to high)')

  // making sure that the first item sorted in the list is the right item
  await expect(page.locator('//div[@class="inventory_item"][1]')).toContainText('Sauce Labs Onesie');

  // sorting items by price, high to low
  await page.locator('[data-test="product_sort_container"]').selectOption('Price (high to low)')

  // making sure that the first item sorted in the list is the right item
  await expect(page.locator('//div[@class="inventory_item"][1]')).toContainText('Sauce Labs Fleece Jacket');

});