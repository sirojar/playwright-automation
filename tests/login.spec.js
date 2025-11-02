import { expect, test } from "@playwright/test";
import { LoginPage } from "../page-object/page-features/LoginPage";

test("User can log in successfully @login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.enterUsername("standard_user");
  await loginPage.enterPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.getText();

  await expect(page).toHaveTitle('Swag Labs');
});