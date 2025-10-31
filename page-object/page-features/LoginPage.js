import { BaseActions } from "../base/BaseActions";

export class LoginPage extends BaseActions {
  constructor(page) {
    super(page);
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async enterUsername(username) {
    // you can directly call .type from BaseActions
    await this.inputValue("username_field", username);
  }

  async enterPassword(password) {
    await this.inputValue("password_field", password);
  }

  async clickLogin() {
    await this.click("login_button");
  }
}
