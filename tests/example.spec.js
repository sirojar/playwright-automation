import { test, expect } from '@playwright/test';
import { getLocator } from '../utils/element_locator_reader.js';

test('user login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const username = await getLocator(page, 'username_field');
  await username.fill('standard_user');


  // await page.locator('#password').fill('secret_sauce')

  await expect(page).toHaveTitle('Swag Labs');

});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
