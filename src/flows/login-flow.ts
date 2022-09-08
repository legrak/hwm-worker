import { Page } from "playwright-core";
import { LoginDriver } from "../drivers/login-driver";
import { UserLogin } from "../types";
import { Flow } from "./flow";

const loginPageUrl = "https://www.heroeswm.ru/";

export class LoginFlow implements Flow {
  constructor(private login: UserLogin) {}

  public async run(page: Page) {
    await page.goto(loginPageUrl);

    const driver = new LoginDriver(page);
    await driver.login(this.login.userName, this.login.password);
  }
}
