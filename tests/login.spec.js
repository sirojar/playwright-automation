import { test } from "@playwright/test";
import { LoginPage } from "../page-object/page-features/LoginPage";

test("@test1 User not able to login without Username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.enterUsername("");
  await loginPage.enterPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.getText();
  const errorMsg = await loginPage.getText();
  console.log("Error message:", errorMsg);
});


test("@test2 User succesfully login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.enterUsername("standard_user");
  await loginPage.enterPassword("secret_sauce");
  await loginPage.clickLogin();
  await loginPage.getText();

  await page.waitForURL("https://www.saucedemo.com/inventory.html");
});