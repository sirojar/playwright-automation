import { test, expect } from '@playwright/test';
import { getLocator } from '../utils/element-locator-reader.js';

test('user login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const username = await getLocator(page, 'username_field');
  await username.fill('standard_user');

  await expect(page).toHaveTitle('Swag Labs');

});
