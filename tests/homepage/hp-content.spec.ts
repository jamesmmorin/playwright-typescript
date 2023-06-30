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

  // verifying the content of the homepage
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(page.getByText('Get your testing superhero on')).toBeVisible();
  await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(page.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();

});

